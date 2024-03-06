import { postsApi } from './postService'

export const commentApi = postsApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPost: builder.query({
      query: ({ id, page, size }) => `comments/${id}?page=${page}&size=${size}`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    editComment: builder.mutation({
      query: ({ id, text }) => {
        return {
          url: `comments/${id}`,
          method: 'PATCH',
          data: { text },
        }
      },
      invalidatesTags: [{ type: 'Comments' }],
    }),
    createComment: builder.mutation({
      query: ({ postId, text }) => {
        return {
          url: `comments?postId=${postId}`,
          method: 'POST',
          data: { text },
        }
      },
      invalidatesTags: [
        { type: 'Comments' },
        { type: 'Posts', id: (arg) => arg.postId },
      ],
    }),
    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: `comments/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [{ type: 'Comments' }],
    }),
  }),
})

export const {
  useGetCommentsByPostQuery,
  useEditCommentMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi
