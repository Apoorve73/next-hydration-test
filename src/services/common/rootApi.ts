import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { baseQuery } from './baseQuery';

// Initialize an empty api service that we'll inject endpoints into dynamically
export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: retry(baseQuery, {
    maxRetries: 2,
  }),
  keepUnusedDataFor: 300, // 5 minutes (300 seconds) - matching your requirement
  /* istanbul ignore next */
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return (action.payload as any)?.[reducerPath];
    }

    return undefined;
  },
  tagTypes: [
    'LessonData',
    'LessonContent',
  ],
  endpoints: () => ({}),
});
