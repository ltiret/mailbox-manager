import { getAccessToken } from './auth';

// Déclaration des types pour une meilleure gestion des données
interface Thread {
  id: string;
  subject: string;
  messages: Message[];
  nbMessages: number;
  UNREAD: boolean;
}

interface Message {
  id: string;
  snippet: string;
  labelIds: string[];
  payload: {
    headers: Array<{ name: string; value: string }>;
  };
}

// Fonction pour récupérer les threads Gmail
export async function fetchThreads(): Promise<Thread[]> {
  const accessToken = getAccessToken();

  try {
    // Récupérer les threads depuis l'API Gmail
    const response = await fetch(
      'https://www.googleapis.com/gmail/v1/users/me/threads?labelIds=INBOX&maxResults=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    // Vérification de la présence des threads
    if (!data.threads) {
      throw new Error(data.error?.message || 'Failed to fetch threads');
    }

    const threads = data.threads as gapi.client.gmail.Thread[];
    const returnedThreads: Thread[] = [];

    // Pour chaque thread, récupérer les messages associés
    for (const thread of threads) {
      const threadResponse = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/threads/${thread.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const threadData = await threadResponse.json();

      if (!threadData.messages) {
        throw new Error('No messages found for thread');
      }

      const messages = threadData.messages as Message[];

      // Extraire le sujet du premier message
      const subjectHeader = messages[0]?.payload?.headers?.find(
        (header) => header.name === 'Subject'
      );

      const subject = subjectHeader ? subjectHeader.value : 'No subject';

      // Ajouter le sujet, les messages et le statut UNREAD au thread
      const fullThread: Thread = {
        id: thread.id || 'default-id', // Assure-toi que 'id' est défini
        subject: subject,
        messages: messages,
        nbMessages: messages.length,
        UNREAD: messages.some((message) => message.labelIds.includes('UNREAD')),
      };

      // Ajouter le thread à la liste
      returnedThreads.push(fullThread);
    }

    return returnedThreads;
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw new Error('Failed to fetch threads');
  }
}

// Fonction pour marquer un thread comme lu
export async function markAsRead(threadId: string): Promise<void> {
  const accessToken = getAccessToken();

  try {
    await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/modify`,
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
  } catch (error) {
    console.error('Error marking thread as read:', error);
    throw new Error('Failed to mark thread as read');
  }
}

// Fonction pour marquer un thread comme non-lu
export async function markAsUnread(threadId: string): Promise<void> {
  const accessToken = getAccessToken();

  try {
    await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/modify`,
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
  } catch (error) {
    console.error('Error marking thread as unread:', error);
    throw new Error('Failed to mark thread as unread');
  }
}
