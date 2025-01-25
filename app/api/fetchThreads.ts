import { getAccessToken } from './auth';

export async function fetchThreads(): Promise<gapi.client.gmail.Thread[]> {
  const accessToken = getAccessToken();

  const response = await fetch(
    'https://www.googleapis.com/gmail/v1/users/me/threads?maxResults=50',
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

  return data.threads;
}
