import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api', // Our Next.js API routes base path
  credentials: 'include',
  prepareHeaders(headers, api) {
    // Add any common headers here
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  timeout: 20000,
});
