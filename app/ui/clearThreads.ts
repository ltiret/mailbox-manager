export function clearThreads(): void {
  const tableBody = document.querySelector<HTMLTableSectionElement>(
    '#threadsTable tbody'
  );
  if (tableBody) {
    tableBody.innerHTML = 'Sign in to see your threads.';
  }
}
