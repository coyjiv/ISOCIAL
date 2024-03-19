import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/config'

const getPersonalFriends = createAsyncThunk(
  'friends/getPersonalFriends',
  async ({ id, page, size }) => {
    try {
      const response = await instance.get(
        `friends/personal/${id}?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getFriendsList = createAsyncThunk(
  'friends/getFriendsList',
  async ({ id, page, size }) => {
    try {
      const response = await instance.get(
        `friends/${id}?page=${page}&size=${size}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const sendFriendRequest = createAsyncThunk(
  'friends/sendFriendRequest',
  async ({ userId }) => {
    try {
      const response = await instance.post(`friends?addresserId=${userId}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)

const removeFriend = createAsyncThunk(
  'friends/removeFriend',
  async ({ userId }, onResolve) => {
    try {
      const response = await instance.delete(`friends?friendId=${userId}`)
      return onResolve({ ...response.data, userId })
    } catch (error) {
      return error
    }
  }
)

const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async ({ userId, user }, onResolve) => {
    try {
      const response = await instance.post(`friends/accept?friendId=${userId}`)
      return onResolve({ ...response.data, userId, user })
    } catch (error) {
      return error
    }
  }
)

const declineFriendRequest = createAsyncThunk(
  'friends/declineFriendRequest',
  async ({ userId }, onResolve) => {
    try {
      const response = await instance.post(`friends/decline?friendId=${userId}`)
      return onResolve({ ...response.data, userId })
    } catch (error) {
      return error
    }
  }
)

const subscribersCount = createAsyncThunk(
  'friends/subscribersCount',
  async (id) => {
    try {
      const response = await instance.get(`friends/subscribersCount/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)

const cancelFriendRequest = createAsyncThunk(
  'friends/cancelFriendRequest',
  async ({ userId }, onResolve) => {
    try {
      const response = await instance.post(
        `friends/cancelFriendRequest?friendId=${userId}`,
        { userId }
      )
      return onResolve({ ...response.data, userId })
    } catch (error) {
      return error
    }
  }
)

const availableFriendRequests = createAsyncThunk(
  'friends/availableFriendRequests',
  async (id) => {
    try {
      const response = await instance.get(
        `friends/availableFriendRequests?userId=${id}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

export {
  getPersonalFriends,
  getFriendsList,
  sendFriendRequest,
  removeFriend,
  acceptFriendRequest,
  declineFriendRequest,
  subscribersCount,
  cancelFriendRequest,
  availableFriendRequests,
}
