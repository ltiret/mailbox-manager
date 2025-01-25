import { getAccessToken } from './api/auth';
import { fetchAndDisplayThreads } from './ui/fetchAndDisplayThreads';
import { setButtonsState } from './ui/setButtonsState';
import { setupLogoutButton } from './ui/setupLogoutButton';
import { setupSignInButton } from './ui/setupSignInButton';

document.addEventListener('DOMContentLoaded', () => {
  setupSignInButton();
  setupLogoutButton();
  fetchAndDisplayThreads();
  setButtonsState(Boolean(getAccessToken()));
});
