import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/config'

const getPersonalPosts = createAsyncThunk(
  'posts/getPersonalPosts',
  async ({ page, size }) => {
    try {
      const response = await instance.get(
        `posts/personal?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getPosts = createAsyncThunk('posts/getPosts', async ({ page, size }) => {
  try {
    const response = await instance.get(`posts?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    return error
  }
})

const getPostsByUser = createAsyncThunk(
  'posts/getPostsByUser',
  async ({ id, page, size }) => {
    try {
      const response = await instance.get(
        `posts/author/${id}?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getSavedPosts = createAsyncThunk(
  'posts/getSavedPosts',
  async ({ page, size = 20 }) => {
    try {
      const response = await instance.get(
        `posts/favorite?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
  try {
    const response = await instance.get(`posts/${id}`)
    return response.data
  } catch (error) {
    return error
  }
})

const getRecommendations = createAsyncThunk(
  'posts/getRecommendations',
  async ({ page, size }) => {
    try {
      const response = await instance.get(
        `posts/recommendations?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, textContent }) => {
    try {
      const response = await instance.patch(`posts/${id}`, { textContent })
      return response.data
    } catch (error) {
      return error
    }
  }
)

const repost = createAsyncThunk('posts/repost', async (data) => {
  try {
    const response = await instance.post(`posts/repost`, data)
    return response.data
  } catch (error) {
    return error
  }
})

const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    const response = await instance.delete(`posts/${id}`)
    return response.data
  } catch (error) {
    return error
  }
})

const createPost = createAsyncThunk('posts/createPost', async (data) => {
  try {
    const response = await instance.post(`posts`, data)
    return response.data
  } catch (error) {
    return error
  }
})

const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async ({ entityId, entityType = 'POST' }, { fulfillWithValue }) => {
    try {
      const response = await instance.post(
        `likes/toggle?entityId=${entityId}&entityType=${entityType}`
      )
      // Include entityId in the payload explicitly
      return fulfillWithValue({ ...response.data, entityId })
    } catch (error) {
      return error
    }
  }
)

const toggleSave = createAsyncThunk(
  'posts/toggleSave',
  async (postId, { fulfillWithValue }) => {
    try {
      const response = await instance.post(`favorites/toggle`, {
        selectedPostId: postId,
      })
      return fulfillWithValue({ ...response.data, postId })
    } catch (error) {
      return error
    }
  }
)

export {
  getPersonalPosts,
  getPosts,
  getPostsByUser,
  getSavedPosts,
  getPostById,
  editPost,
  repost,
  deletePost,
  createPost,
  toggleLike,
  toggleSave,
  getRecommendations,
}
