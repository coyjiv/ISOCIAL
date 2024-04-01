import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api";

const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async ({ chatId, page }) => {
    const response = await instance.get(
      `messages?page=${page}&quantity=15&chatId=${chatId}`,
    );
    return response.data;
  },
);

const fetchChats = createAsyncThunk("chat/fetchChats", async ({ page }) => {
  const response = await instance.get(`chats?page=${page}&quantity=30`);
  return response.data;
});

const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, data }) => {
    const response = await instance.post(`messages?chatId=${chatId}`, data);
    return response.data;
  },
);

const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async ({ messageId }) => {
    const response = await instance.delete(`messages/${messageId}`);
    return response.data;
  },
);

const deleteChat = createAsyncThunk("chat/deleteChat", async ({ chatId }) => {
  const response = await instance.delete(`chats/${chatId}`);

  return response.data;
});

export {
  fetchChatMessages,
  fetchChats,
  sendMessage,
  deleteMessage,
  deleteChat,
};
