import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constant/Url';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1`}),
  tagTypes: ['newBook','addReview'],
  endpoints: () => ({}),
});


