import { getAccessToken } from './auth';

export async function fetchThreads(): Promise<any[]> {
  const accessToken = getAccessToken();

  const response = await fetch(
    'https://www.googleapis.com/gmail/v1/users/me/threads?labelIds=INBOX&maxResults=10',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!data.threads) {
    throw new Error(data.error.message || 'Failed to fetch threads');
  }

  const threads = data.threads as gapi.client.gmail.Thread[];

  const retrunedThreads = [] as any[];

  for (const thread of threads) {
    const response = await fetch(
      'https://www.googleapis.com/gmail/v1/users/me/threads/' + thread.id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const thread2 = (await response.json()) as gapi.client.gmail.Thread;
    for (const message of thread2.messages!) {
      for (const label of message.labelIds!) {
        if (label === 'UNREAD') {
          (thread as any).UNREAD = true;
        }
      }
    }

    (thread as any).nbMessages = thread2.messages!.length;

    retrunedThreads.push(thread);
  }

  return retrunedThreads;
}

export async function markAsRead(threadid: number) {
  const accessToken = getAccessToken();

  await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/threads/' +
      threadid +
      '/modify',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify({
        removeLabelIds: ['UNREAD'],
      }),
    }
  );
}

export async function markAsUnread(threadid: number) {
  const accessToken = getAccessToken();

  await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/threads/' +
      threadid +
      '/modify',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify({
        addLabelIds: ['UNREAD'],
      }),
    }
  );
}
