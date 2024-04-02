import { friendsApi } from './friendService'

export const postsApi = friendsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
      providesTags: (result, error, { id }) => [
        { type: 'Posts', id },
        { type: 'Profile', id },
      ],
    }),
    getPostsByUser: builder.query({
      query: ({ id, page, size }) =>
        `posts/author/${id}?page=${page}&size=${size}`,
      providesTags: (result, error, { id }) => [
        { type: 'Posts', id },
        { type: 'Profile', id },
      ],
    }),
    getSavedPosts: builder.query({
      query: ({ page, size = 20 }) =>
        `posts/favorite?page=${page}&size=${size}`,
      providesTags: ['Posts'],
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    editPost: builder.mutation({
      query: ({ id, textContent }) => {
        return {
          url: `posts/${id}`,
          method: 'PATCH',
          data: { textContent },
        }
      },
      invalidatesTags: [{ type: 'Posts' }],
    }),
    repost: builder.mutation({
      query: (data) => {
        return {
          url: `posts/repost`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: [{ type: 'Posts' }],
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [{ type: 'Posts' }],
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: `posts`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: [{ type: 'Posts' }],
    }),
    toggleLike: builder.mutation({
      query: ({ entityId, entityType }) => {
        return {
          url: `likes/toggle?entityId=${entityId}&entityType=${entityType}`,
          method: 'POST',
        }
      },
      invalidatesTags: (result, error, { entityId }) => [
        { type: 'Posts', id: entityId },
      ],
    }),
    toggleSave: builder.mutation({
      query: (postId) => {
        return {
          url: `favorites/toggle`,
          method: 'POST',
          data: {
            selectedPostId: postId,
          },
        }
      },
    }),
    getPostRecommendations: builder.query({
      query: ({ page, size = 3 }) =>
        `posts/recommendations?page=${page}&size=${size}`,
      providesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useGetPostByIdQuery,
  useEditPostMutation,
  useRepostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useToggleLikeMutation,
  useToggleSaveMutation,
  useGetSavedPostsQuery,
  useGetPostRecommendationsQuery,
} = postsApi
