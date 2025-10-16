import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, AuthRow, UserDTO } from '@vault/core/types';

// --- API ---
export const vaultApi = createApi({
  reducerPath: 'vaultApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001', // adjust if needed
  }),
  tagTypes: ['User', 'Auth'],
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<UserDTO[]>, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),

    getUserById: builder.query<
      ApiResponse<{ user: UserDTO; relatedAuths: AuthRow[] }>,
      number
    >({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    getUserByQuery: builder.query<
      ApiResponse<{ user: UserDTO; relatedAuths: AuthRow[] }>,
      { username?: string; phone?: string }
    >({
      query: ({ username, phone }) => {
        const params = new URLSearchParams();
        if (username) params.append('username', username);
        if (phone) params.append('phone', phone);
        return `/users?${params.toString()}`;
      },
      providesTags: ['User'],
    }),

    getUserByPhone: builder.query<
      ApiResponse<{ user: UserDTO; relatedAuths: AuthRow[] }>,
      string
    >({
      query: (phone) => `/users?phone=${encodeURIComponent(phone)}`,
      providesTags: (_result, _error, phone) => [{ type: 'User', id: phone }],
    }),

    getAuths: builder.query<ApiResponse<AuthRow[]>, void>({
      query: () => '/auths',
      providesTags: ['Auth'],
    }),

    getAuthById: builder.query<ApiResponse<any>, number>({
      query: (id) => `/auths/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Auth', id }],
    }),

    createAuthForUser: builder.mutation<
      ApiResponse<AuthRow>,
      { userId: number; phone: string }
    >({
      query: ({ userId, phone }) => ({
        url: `/users/${userId}/auths`,
        method: 'POST',
        body: { phone },
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserByQueryQuery,
  useGetUserByPhoneQuery, // ✅ new hook
  useGetAuthsQuery,
  useGetAuthByIdQuery,
  useCreateAuthForUserMutation,
} = vaultApi;
