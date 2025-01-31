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
      decodeHtmlEntities(thread.subject) || '(No subject available)';
    row.appendChild(snippetCell);

    const nbMessages = document.createElement('td');
    row.appendChild(nbMessages);
    nbMessages.textContent = thread.nbMessages;

    const bluedot = document.createElement('span');
    snippetCell.appendChild(bluedot);
    bluedot.classList.add('bluedot');

    if (thread.UNREAD) {
      const UNREADCell = document.createElement('td');
      row.appendChild(UNREADCell);
      row.classList.add('unread');

      const markasread = document.createElement('button');
      markasread.classList.add('button');
      markasread.textContent = 'Mark as read';
      UNREADCell.appendChild(markasread);

      markasread.addEventListener('click', function () {
        row.classList.add('READ');
        row.classList.remove('unread');

        document.createElement('button');
        markasread.textContent = 'Mark as unread';
        markAsRead(thread.id);
      });
    } else {
      const markasunread = document.createElement('button');
      markasunread.classList.add('button');
      markasunread.textContent = 'Mark as unread';
      const readCell = document.createElement('td');
      row.appendChild(readCell);
      row.classList.add('READ');
      readCell.appendChild(markasunread);

      markasunread.addEventListener('click', function () {
        const markasread = document.createElement('button');
        markasread.classList.add('button');
        markasread.textContent = 'Mark as read';
        const UNREADCell = document.createElement('td');
        row.classList.add('unread');
        row.classList.remove('READ');

        UNREADCell.appendChild(markasread);

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
