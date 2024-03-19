import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.chats = action.payload
    },
    removeMessage: (state, action) => {
      state.chats = action.payload
    },
  },
})

export const {
  setChats,
  setMessages,
  addMessage,
  removeMessage,
} = chatSlice.actions

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
