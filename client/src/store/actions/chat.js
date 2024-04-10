import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../api'

const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async ({ chatId, page }) => {
    const response = await instance.get(
      `messages?page=${page}&quantity=15&chatId=${chatId}`
    )
    return response.data
  }
)

const fetchChats = createAsyncThunk('chat/fetchChats', async ({ page, quantity=30 }) => {
  const response = await instance.get(`chats?page=${page}&quantity=${quantity}`)
  return response.data
})

const fetchChatInfo = createAsyncThunk(
  'chat/fetchChatInfo',
  async ({ chatId }) => {
    const response = await instance.get(`chats/${chatId}`)
    return response.data
  }
)

const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, data }) => {
    const response = await instance.post(`messages?chatId=${chatId}`, data)
    return response.data
  }
)

const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async ({ messageId }) => {
    const response = await instance.delete(`messages/${messageId}`)
    return response.data
  }
)

const deleteChat = createAsyncThunk('chat/deleteChat', async ({ chatId }) => {
  const response = await instance.delete(`chats/${chatId}`)

  return response.data
})

const updateChats = createAsyncThunk('chat/updateChats', async (chatIds) => {
  const updatedChatsInfo = await Promise.all(
    chatIds.map((chatId) => instance.get(`chats/${chatId}`))
  )
  return updatedChatsInfo.map((chat) => chat.data)
})

const readMessage = createAsyncThunk(
  'chat/readMessage',
  async ({ messageId }) => {
    const response = await instance.post(`messages/read?messageId=${messageId}`)
    if(response.status !== 200) {
      throw new Error('Failed to read message')
    }
    return messageId
  }
)

export {
  fetchChatMessages,
  fetchChats,
  sendMessage,
  deleteMessage,
  deleteChat,
  fetchChatInfo,
  updateChats,
  readMessage,
}
