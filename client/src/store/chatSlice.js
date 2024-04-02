import { createSlice } from "@reduxjs/toolkit";
import {
  deleteChat,
  fetchChatMessages,
  fetchChats,
  sendMessage,
} from "./actions/chat";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {
      data: [],
      isLoading: true,
      hasNext: false,
      error: null,
      status: "idle",
      page: 0,
    },
    messages: [],
    selectedChatMessages: {
      data: [],
      isLoading: true,
      hasNext: false,
      error: null,
      page: 0,
      status: "idle",
    },
    selectedChat: null,
    pendingChat: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    addWSMessage: (state, action) => {
      state.selectedChatMessages.data = [
        action.payload,
        ...state.selectedChatMessages.data,
      ];
      state.selectedChat.lastMessage = action.payload.text;
      state.chats.data = state.chats.data.map((chat) => {
        if (chat.id === action.payload.chatId) {
          chat.lastMessage = action.payload.text;
        }
        return chat;
      });
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload,
      );
    },
    clearPendingChat: (state) => {
      state.pendingChat = null;
    },
    setPendingChat: (state, action) => {
      state.pendingChat = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      //check if exist in chats if not - add
      if (action.payload === null) return;
      const chatIndex = state.chats.data.findIndex(
        (chat) => chat.id === action.payload.id,
      );
      if (chatIndex === -1) {
        state.chats.data = [action.payload, ...state.chats.data];
      }
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = action.payload;
    },
    incrementSelectedChatMessagesPage: (state) => {
      state.selectedChatMessages.page += 1;
    },
    removeChat: (state, action) => {
      state.chats.data = state.chats.data.filter(
        (chat) => chat.id !== action.payload,
      );
      console.log(state.chats.data);
      console.log(action.payload, "selected");
      state.messages = state.messages.filter(
        (message) => message.chatId !== action.payload,
      );
      console.log(action.payload, "selected");
      if (state.selectedChat?.id === action.payload) {
        console.log(action.payload, "selected");
        state.selectedChat = null;
        state.selectedChatMessages = {
          data: [],
          isLoading: true,
          hasNext: false,
          error: null,
          page: 0,
          status: "idle",
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.selectedChatMessages.isLoading = false;
      state.selectedChatMessages.hasNext = action.payload.hasNext;

      //check if already have messages with this id
      const newMessages = action.payload.content.filter(
        (message) =>
          !state.selectedChatMessages.data.some(
            (oldMessage) => oldMessage.id === message.id,
          ),
      );
      state.selectedChatMessages.data = [
        ...state.selectedChatMessages.data,
        ...newMessages,
      ];

      state.selectedChatMessages.error = null;
      state.selectedChatMessages.status = "completed";
    });
    builder.addCase(fetchChatMessages.rejected, (state, action) => {
      state.selectedChatMessages.isLoading = false;
      state.selectedChatMessages.hasNext = false;
      state.selectedChatMessages.error = action.error;
      state.selectedChatMessages.status = "failed";
    });
    builder.addCase(fetchChatMessages.pending, (state) => {
      if (!state.selectedChatMessages.isLoading) {
        state.selectedChatMessages.isLoading = true;
        state.selectedChatMessages.error = null;
        state.selectedChatMessages.status = "loading";
      }
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats.isLoading = false;
      state.chats.hasNext = action.payload.hasNext;
      state.chats.data = [
        ...state.chats.data,
        ...action.payload.content,
      ].filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
      state.chats.error = null;
      state.chats.status = "completed";
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.chats.isLoading = false;
      state.chats.hasNext = false;
      state.chats.error = action.error;
      state.chats.status = "failed";
    });
    builder.addCase(fetchChats.pending, (state) => {
      if (!state.chats.isLoading) {
        state.chats.isLoading = true;
        state.chats.error = null;
        state.chats.status = "loading";
      }
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.selectedChatMessages.data = [
        action.payload,
        ...state.selectedChatMessages.data,
      ];
      state.selectedChat.lastMessage = action.payload.text;
      state.chats.data = state.chats.data.map((chat) => {
        if (chat.id === action.payload.chatId) {
          chat.lastMessage = action.payload.text;
          chat.lastMessageDate = action.payload.lastModifiedDate;
        }
        return chat;
      });
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(sendMessage.pending, () => {
      console.log("Sending message...");
    });
    builder.addCase(deleteChat.rejected, () => {
      console.log("Не удалось");
    });
    builder.addCase(deleteChat.fulfilled, () => {
      console.log("Идём спать");
    });
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  removeMessage,
  clearPendingChat,
  setPendingChat,
  setSelectedChat,
  setSelectedChatMessages,
  incrementSelectedChatMessagesPage,
  addWSMessage,
  removeChat,
} = chatSlice.actions;

export default chatSlice.reducer;

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
