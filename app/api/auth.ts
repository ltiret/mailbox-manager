import { fetchAndDisplayThreads } from '../ui/fetchAndDisplayThreads';
import { setButtonsState } from '../ui/setButtonsState';

const CLIENT_ID =
  '233050779895-kp44ng02oae3ibqhf9koa9kk5k6klesm.apps.googleusercontent.com';

let client: google.accounts.oauth2.TokenClient | null = null;

export function initOAuthClient(): void {
  client = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    callback: (tokenResponse: { access_token: string }) => {
      const accessToken = tokenResponse.access_token;
      localStorage.setItem('accessToken', accessToken);
      setButtonsState(true);
      fetchAndDisplayThreads();
    },
  });
}

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function requestAccessToken(): void {
  if (!client) {
    initOAuthClient();
  }
  client?.requestAccessToken();
}

export function logout(): void {
  localStorage.removeItem('accessToken');
}
