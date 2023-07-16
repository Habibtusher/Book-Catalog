import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLatestBooks: builder.query({
      query: () => "books/latest-books",
    }),
    getBooks: builder.query({
      query: ({ filter }) => {
        let queryParams = "?";

        if (filter.page) {
          queryParams += `page=${filter.page}&`;
        }

        if (filter.limit) {
          queryParams += `limit=${filter.limit}&`;
        }

        if (filter.searchTerm) {
          queryParams += `searchTerm=${filter.searchTerm}&`;
        }

        if (filter.publicationYear) {
          queryParams += `publicationYear=${filter.publicationYear}&`;
        }

        if (filter.genre) {
          queryParams += `genre=${filter.genre}&`;
        }

        if (queryParams.endsWith("&")) {
          queryParams = queryParams.slice(0, -1);
        }
        const queryString = `books${queryParams}`;
        return queryString;
      },
    }),
    // singleProduct: builder.query({
    //   query: (id) => `/product/${id}`,
    // }),
    // postComment: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/comment/${id}`,
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: [`comments`],
    // }),
    // getComments: builder.query({
    //   query: (id) => `/comment/${id}`,
    //   providesTags: ['comments'],
    // }),
  }),
});
export const { useGetLatestBooksQuery, useGetBooksQuery } = booksApi;
