import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    selectedChatMessages: [],
    selectedChat: null,
    pendingChat: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages = [...state.chats, action.payload]
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      )
    },
    clearPendingChat: (state) => {
      state.pendingChat = null
    },
    setPendingChat: (state, action) => {
      state.pendingChat = action.payload
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = action.payload
    },
  },
})

export const {
  setChats,
  setMessages,
  addMessage,
  removeMessage,
  clearPendingChat,
  setPendingChat,
  setSelectedChat,
  setSelectedChatMessages,
} = chatSlice.actions

export default chatSlice.reducer

// {
//     "id": 1,
//     "chatName": "Michael Williams",
//     "lastMessage": "string",
//     "lastMessageBy": 1,
//     "lastMessageDate": "2024-03-07T06:42:08.852+00:00",
//     "avatarUrl": "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
//     "receiverStatus": "OFFLINE",
//     messages: [
// {
//     "id": 2,
//     "creationDate": "2024-03-07T06:50:31.349+00:00",
//     "lastModifiedDate": "2024-03-07T06:50:31.349+00:00",
//     "chatId": 2,
//     "senderId": 1,
//     "status": "SENT",
//     "text": "string",
//     "attachments": [],
//     "edited": false,
//     "entityType": "MESSAGE",
//     "active": true
//   }
//     ]
//   },
