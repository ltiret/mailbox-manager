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

    if (thread.UNREAD === true) {
      snippetCell.classList.add('UNREAD');
      const bluedot = document.createElement('span');
      snippetCell.appendChild(bluedot);
      bluedot.classList.add('UNREAD');
      bluedot.classList.add('dot');

      const UNREADCell = document.createElement('td');
      threadIdCell.classList.add('UNREAD');
      nbMessages.classList.add('UNREAD');
      UNREADCell.classList.add('UNREAD');
      row.appendChild(UNREADCell);

      const markasread = document.createElement('button');
      markasread.classList.add('button');
      markasread.textContent = 'Mark as read';
      UNREADCell.appendChild(markasread);

      markasread.addEventListener('click', function () {
        bluedot.classList.remove('UNREAD');
        bluedot.classList.remove('dot');
        document.createElement('button');
        markasread.classList.add('button');
        markasread.textContent = 'Mark as unread';
        UNREADCell.classList.add('READ');
        snippetCell.classList.add('READ');
        threadIdCell.classList.add('READ');
        nbMessages.classList.add('READ');
        markAsRead(thread.id);
      });
    } else {
      const bluedot = document.createElement('span');
      const markasunread = document.createElement('button');
      markasunread.classList.add('button');
      markasunread.textContent = 'Mark as unread';
      bluedot.classList.add('UNREAD');
      bluedot.classList.add('dot');
      const readCell = document.createElement('td');
      row.appendChild(readCell);
      row.classList.add('READ');
      readCell.appendChild(markasunread);

      markasunread.addEventListener('click', function () {
        const bluedot = document.createElement('span');
        bluedot.classList.add('UNREAD');
        bluedot.classList.add('dot');
        snippetCell.classList.add('UNREAD');
        const markasread = document.createElement('button');
        const UNREADCell = document.createElement('td');
        UNREADCell.classList.remove('READ');
        readCell.classList.add('UNREAD');
        markasread.classList.add('button');
        markasread.textContent = 'Mark as read';

        UNREADCell.appendChild(markasread);

        snippetCell.classList.add('UNREAD');
        threadIdCell.classList.add('UNREAD');
        nbMessages.classList.add('UNREAD');
        markasunread.classList.add('button');
        snippetCell.classList.add('UNREAD');

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
