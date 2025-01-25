import { logout } from '../api/auth';
import { clearThreads } from './clearThreads';
import { setButtonsState } from './setButtonsState';

export function setupLogoutButton(): void {
  const logoutButton =
    document.querySelector<HTMLButtonElement>('#logoutButton')!;

  logoutButton.addEventListener('click', () => {
    logout();
    setButtonsState(false);
    clearThreads();
  });
}
