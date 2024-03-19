import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/config'

const getPersonalProfile = createAsyncThunk(
  'users/getPersonalProfile',
  async (id = localStorage.getItem('userId')) => {
    try {
      const response = await instance.get(`users/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getProfileById = createAsyncThunk('users/getProfileById', async (id) => {
  try {
    const response = await instance.get(`users/${id}`)
    return response.data
  } catch (error) {
    return error
  }
})

const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async ({ body, id }) => {
    try {
      const response = await instance.patch(`users/${id}`, body)
      return response.data
    } catch (error) {
      return error
    }
  }
)

const searchUser = createAsyncThunk(
  'users/searchUser',
  async ({ name, page = 0, size = 10 }) => {
    try {
      const response = await instance.get(
        `users/search?name=${name}&page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

export { getPersonalProfile, getProfileById, updateProfile, searchUser }
