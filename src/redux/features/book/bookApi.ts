import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLatestBooks: builder.query({
      query: () => "books/latest-books",
      providesTags: ["newBook"],
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
      providesTags: ["newBook"],
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: "books/add-new-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newBook"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
          url: `/books/${id}`,
          method: "DELETE"
         }
      ),
      invalidatesTags: ["newBook"],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags:['addReview']
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/add-review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['addReview'],
    }),
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
export const {
  useGetLatestBooksQuery,
  useGetBooksQuery,
  useAddNewBookMutation,
  useSingleBookQuery,
  useAddReviewMutation,
  useDeleteBookMutation
} = booksApi;
