export function displayThreads(threads: any[]): void {
  const tableBody = document.querySelector<HTMLTableSectionElement>(
    '#threadsTable tbody'
  )!;

  tableBody.innerHTML = '';

  threads.forEach((thread) => {
    const row = document.createElement('tr');

    const threadIdCell = document.createElement('td');
    threadIdCell.textContent = thread.id;
    row.appendChild(threadIdCell);

    const snippetCell = document.createElement('td');
    const text = document.createElement('span');
    text.textContent =
      decodeHtmlEntities(thread.snippet) || '(No snippet available)';
    row.appendChild(snippetCell);

    const nbMessages = document.createElement('td');
    row.appendChild(nbMessages);
    nbMessages.textContent = thread.nbMessages;

    if (thread.UNREAD === true) {
      const bluedot = document.createElement('span');
      snippetCell.appendChild(bluedot);
      const UNREADCell = document.createElement('td');
      UNREADCell.textContent = decodeHtmlEntities(thread.UNREAD) || 'UNREAD';
      snippetCell.classList.add('UNREAD');
      threadIdCell.classList.add('UNREAD');
      bluedot.classList.add('dot');
      row.appendChild(UNREADCell);
      nbMessages.classList.add('UNREAD');
      UNREADCell.classList.add('UNREAD');
    } else {
      const readCell = document.createElement('td');
      row.appendChild(readCell);

      row.classList.add('READ');
    }

    snippetCell.appendChild(text);
    tableBody.appendChild(row);
  });
}

function decodeHtmlEntities(str: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}
