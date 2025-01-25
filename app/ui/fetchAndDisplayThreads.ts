import { getAccessToken } from '../api/auth';
import { fetchThreads } from '../api/fetchThreads';
import { clearThreads } from './clearThreads';
import { displayThreads } from './displayThreads';

let timeoutId: number | undefined;

export async function fetchAndDisplayThreads() {
  clearTimeout(timeoutId);
  if (getAccessToken()) {
    const threads = await fetchThreads();
    displayThreads(threads);
    timeoutId = setTimeout(fetchAndDisplayThreads, 10000);
  } else {
    clearThreads();
  }
}
