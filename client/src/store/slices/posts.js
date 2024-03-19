import { createSlice } from '@reduxjs/toolkit'
import {
  getPersonalPosts,
  getPostsByUser,
  getSavedPosts,
  getPostById,
  getRecommendations,
  editPost,
  repost,
  deletePost,
  createPost,
  toggleLike,
  toggleSave,
} from '../actions/posts'

export const paginationDto = {
  content: [],
  isLoading: false,
  error: '',
  hasNext: true,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    recommendations: paginationDto,
    personalPosts: paginationDto,
    posts: paginationDto,
    saved: paginationDto,
    post: {
      id: '',
      textContent: '',
      attachments: [],
      originalPostId: null,
      originalPost: null,
      authorId: '',
      authorAvatar: '',
      authorFullName: '',
      authorLastSeen: '',
      likesCount: 0,
      recentLikedUsers: [],
      commentsCount: 0,
      recentComments: [],
      authorPremium: false,
      authorPremiumNickname: '',
      authorPremiumEmoji: '',
      creationDate: '',
      edited: false,
      liked: false,
      favourite: false,
      isLoading: false,
      error: '',
    },
    mutationError: '',
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        if (state.posts.content.length > 0) {
          state.posts.content = [
            ...state.posts.content,
            ...action.payload.content,
          ]
        } else {
          state.posts = action.payload
        }
        state.posts.error = ''
        state.posts.isLoading = false
      })
      .addCase(getPostsByUser.pending, (state) => {
        state.posts.isLoading = true
      })
      .addCase(getPostsByUser.rejected, (state, action) => {
        state.posts.isLoading = false
        state.posts.error = action.error.message
      })
      .addCase(getPersonalPosts.fulfilled, (state, action) => {
        if (state.personalPosts.content.length > 0) {
          state.personalPosts.content = [
            ...state.personalPosts.content,
            ...action.payload.content,
          ]
        } else {
          state.personalPosts = action.payload
        }
        state.personalPosts.error = ''
        state.personalPosts.isLoading = false
      })
      .addCase(getPersonalPosts.pending, (state) => {
        state.personalPosts.isLoading = true
      })
      .addCase(getPersonalPosts.rejected, (state, action) => {
        state.personalPosts.isLoading = false
        state.personalPosts.error = action.error.message
      })
      .addCase(getSavedPosts.fulfilled, (state, action) => {
        if (state.saved.content.length > 0) {
          state.saved.content = [
            ...state.saved.content,
            ...action.payload.content,
          ]
        } else {
          state.saved = action.payload
        }
        state.saved.error = ''
        state.saved.isLoading = false
      })
      .addCase(getSavedPosts.pending, (state) => {
        state.saved.isLoading = true
      })
      .addCase(getSavedPosts.rejected, (state, action) => {
        state.saved.isLoading = false
        state.saved.error = action.error.message
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload
        state.post.error = ''
      })
      .addCase(getPostById.pending, (state) => {
        state.post = { ...state.post, isLoading: true }
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.post.isLoading = false
        state.post.error = action.error.message
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        if (state.recommendations.content.length > 0) {
          state.recommendations.content = [
            ...state.recommendations.content,
            ...action.payload.content,
          ]
        } else {
          state.recommendations = action.payload
        }
        state.recommendations.error = ''
        state.recommendations.isLoading = false
      })
      .addCase(getRecommendations.pending, (state) => {
        state.recommendations.isLoading = true
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.recommendations.isLoading = false
        state.recommendations.error = action.error.message
      })
      .addCase(editPost.fulfilled, (state, action) => {
        // find post in personalPosts and update it
        state.personalPosts.content = state.personalPosts.content.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )

        // find post in posts and update it
        state.posts.content = state.posts.content.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )

        // find post in saved and update it
        state.saved.content = state.saved.content.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )

        // find post in recommendations and update it
        state.recommendations.content = state.recommendations.content.map(
          (post) => (post.id === action.payload.id ? action.payload : post)
        )

        if (state.post.id === action.payload.id) {
          state.post = action.payload
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(repost.fulfilled, (state, action) => {
        state.personalPosts.content = [
          action.payload,
          ...state.personalPosts.content,
        ]
      })
      .addCase(repost.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.personalPosts.content = state.personalPosts.content.filter(
          (post) => post.id !== action.payload
        )
        state.posts.content = state.posts.content.filter(
          (post) => post.id !== action.payload
        )
        state.saved.content = state.saved.content.filter(
          (post) => post.id !== action.payload
        )
        state.recommendations.content = state.recommendations.content.filter(
          (post) => post.id !== action.payload
        )
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.personalPosts.content = [
          action.payload,
          ...state.personalPosts.content,
        ]
      })
      .addCase(createPost.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const entityId = action.payload.entityId
        state.personalPosts.content = state.personalPosts.content.map((post) =>
          post.id === entityId ? { ...post, liked: !post.liked } : post
        )
        state.posts.content = state.posts.content.map((post) =>
          post.id === entityId ? { ...post, liked: !post.liked } : post
        )
        state.saved.content = state.saved.content.map((post) =>
          post.id === entityId ? { ...post, liked: !post.liked } : post
        )
        state.recommendations.content = state.recommendations.content.map(
          (post) =>
            post.id === entityId ? { ...post, liked: !post.liked } : post
        )
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(toggleSave.fulfilled, (state, action) => {
        const postId = action.payload.postId
        state.personalPosts.content = state.personalPosts.content.map((post) =>
          post.id === postId ? { ...post, favourite: !post.favourite } : post
        )
        state.posts.content = state.posts.content.map((post) =>
          post.id === postId ? { ...post, favourite: !post.favourite } : post
        )
        state.saved.content = state.saved.content.map((post) =>
          post.id === postId ? { ...post, favourite: !post.favourite } : post
        )
        state.recommendations.content = state.recommendations.content.map(
          (post) =>
            post.id === postId ? { ...post, favourite: !post.favourite } : post
        )
      })
      .addCase(toggleSave.rejected, (state, action) => {
        state.mutationError = action.error.message
      }),
})

// export const {
//   setChats,
//   setMessages,
//   addMessage,
//   removeMessage,
// } = postSlice.actions
