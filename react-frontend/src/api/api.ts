import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api/',
    // baseUrl: 'https://3502-37-17-54-18.ngrok-free.app/api/',
    credentials: 'include',
  }),
  tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser', 'Comments'],
  endpoints: (builder) => ({}),
});

export const {} = api;
