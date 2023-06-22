import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://f467-37-215-177-245.ngrok-free.app/api/',
    credentials: 'include',
  }),
  tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser', 'Comments'],
  endpoints: (builder) => ({}),
});

export const {} = api;
