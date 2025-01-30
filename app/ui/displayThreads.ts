import { markAsRead, markAsUnread } from '../api/fetchThreads';

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
      snippetCell.classList.add('UNREAD');
      const bluedot = document.createElement('span');
      snippetCell.appendChild(bluedot);
      const UNREADCell = document.createElement('td');

      const markasread = document.createElement('button');
      markasread.classList.add('button');
      markasread.textContent = 'Mark as read';
      UNREADCell.appendChild(markasread);
      markasread.addEventListener('click', function () {
        UNREADCell.classList.add('READ');
        snippetCell.classList.add('READ');
        threadIdCell.classList.add('READ');
        nbMessages.classList.add('READ');
        document.createElement('button');
        markasread.classList.add('button');
        markasread.textContent = 'Mark as unread';
        markAsRead(thread.id);
      });
      threadIdCell.classList.add('UNREAD');
      nbMessages.classList.add('UNREAD');
      UNREADCell.classList.add('UNREAD');
      bluedot.classList.add('dot');
      row.appendChild(UNREADCell);
    } else {
      const readCell = document.createElement('td');
      row.appendChild(readCell);

      row.classList.add('READ');
      const markasunread = document.createElement('button');
      markasunread.classList.add('button');
      markasunread.textContent = 'Mark as unread';
      readCell.appendChild(markasunread);
      markasunread.addEventListener('click', function () {
        readCell.classList.add('UNREAD');
        snippetCell.classList.add('UNREAD');
        threadIdCell.classList.add('UNREAD');
        nbMessages.classList.add('UNREAD');
        document.createElement('button');
        markasunread.classList.add('button');
        markasunread.textContent = 'Mark as read';

        markAsUnread(thread.id);
      });
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
