import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: `users/register`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `users/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupUserMutation,useLoginUserMutation } = userApi;
