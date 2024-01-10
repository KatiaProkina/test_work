import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username: string) => `users/${username}`,
    }),
    getUserRepos: builder.query({
      query: ({ username, page, perPage }) =>
        `users/${username}/repos?per_page=${perPage}&page=${page}`,
    }),
  }),
});

export const { useGetUserQuery, useGetUserReposQuery } = githubApi;
