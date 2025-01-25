import { requestAccessToken } from '../api/auth';

export function setupSignInButton(): void {
  const signInButton =
    document.querySelector<HTMLButtonElement>('#signInButton')!;

  signInButton.addEventListener('click', async () => {
    await requestAccessToken();
  });
}
