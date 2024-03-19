import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api/config'

const createChat = createAsyncThunk(
  'chats/createChat',
  async ({ receiverId, data }) => {
    try {
      const response = await instance.post(
        `chats?receiverId=${receiverId}`,
        data
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const deleteChat = createAsyncThunk('chats/deleteChat', async (chatId) => {
  try {
    const response = await instance.delete(`chats/${chatId}`)
    return response.data
  } catch (error) {
    return error
  }
})

const getChatRecipient = createAsyncThunk(
  'chats/getChatRecipient',
  async (userId) => {
    try {
      const response = await instance.get(`chats/${userId}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)

const getChats = createAsyncThunk('chats/getChats', async (page) => {
  try {
    const response = await instance.get(`chats?page=${page}&quantity=30`)
    return response.data
  } catch (error) {
    return error
  }
})

const getMessages = createAsyncThunk(
  'chats/getMessages',
  async ({ page, chatId }) => {
    try {
      const response = await instance.get(
        `messages?page=${page}&quantity=30&chatId=${chatId}`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
)

const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({ chatId, text }) => {
    try {
      const response = await instance.post(`messages?chatId=${chatId}`, {
        text,
      })
      return response.data
    } catch (error) {
      return error
    }
  }
)

const deleteMessage = createAsyncThunk(
  'chats/deleteMessage',
  async (messageId) => {
    try {
      const response = await instance.delete(`messages/${messageId}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)

export {
  createChat,
  deleteChat,
  getChatRecipient,
  getChats,
  getMessages,
  sendMessage,
  deleteMessage,
}
