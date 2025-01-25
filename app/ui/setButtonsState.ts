export function setButtonsState(isSignedIn: boolean) {
  document.querySelector<HTMLButtonElement>('#signInButton')!.disabled =
    isSignedIn;
  document.querySelector<HTMLButtonElement>('#logoutButton')!.disabled =
    !isSignedIn;
}
