import axios from 'axios';

/**
 * Single axios instance for the whole app. Real API-backed services should
 * be built on top of this client instead of importing axios directly.
 *
 * TODO: point baseURL at your real backend once one exists.
 */
export const httpClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10_000,
});

httpClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);
