import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'jiraApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e741-46-56-187-68.ngrok-free.app/api/',
    credentials: 'include',
  }),
  tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser', 'Comments'],
  endpoints: (builder) => ({}),
});

export const {} = api;
