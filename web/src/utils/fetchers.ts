import { FetchError } from '../types/types';

const getFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: FetchError = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }

  return res.json();
};

const postFetcher = async (url: string, body: Record<string, unknown>) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error: FetchError = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }

  return res.json();
};

export { postFetcher, getFetcher };
