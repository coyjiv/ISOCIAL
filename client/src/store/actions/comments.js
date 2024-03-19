import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/config'

const getCommentsByPost = createAsyncThunk(
  'comments/getCommentsByPost',
  async ({ id, page, size }) => {
    try {
      const response = await instance.get(
        `comments/${id}?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ id, text }) => {
    try {
      const response = await instance.patch(`comments/${id}`, { text })
      return response.data
    } catch (error) {
      return error
    }
  }
)

const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, text }) => {
    try {
      const response = await instance.post(`comments?postId=${postId}`, {
        text,
      })
      return response.data
    } catch (error) {
      return error
    }
  }
)

const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
  try {
    const response = await instance.delete(`comments/${id}`)
    return response.data
  } catch (error) {
    return error
  }
})

export { getCommentsByPost, editComment, createComment, deleteComment }
