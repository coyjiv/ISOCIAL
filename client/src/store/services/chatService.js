import { friendsApi } from './friendService'

export const chatApi = friendsApi.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ receiverId, data }) => {
        return {
          url: `chats?receiverId=${receiverId}`,
          method: 'POST',
          data: {text, attachments}
        }
      },
      invalidatesTags: () => [{ type: 'Chats' }],
    }),
    deleteChat: builder.mutation({
      query: ({ chatId }) => {
        return {
          url: `chats/${chatId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Chats', id: chatId },
      ],
    }),
    getChatRecipient: builder.query({
      query: (userId) => `chats/${userId}`,
      providesTags: (userId) => [{ type: 'Chats', userId }],
    }),
    getChats: builder.query({
      query: (page) => `chats?page=${page}&quantity=30`,
      providesTags: () => [{ type: 'Chats' }],
    }),
    getMessages: builder.query({
      query: ({ page, chatId }) =>
        `messages?page=${page}&quantity=30&chatId=${chatId}`,
      providesTags: (result, error, { chatId }) => [
        { type: 'Messages', chatId },
      ],
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, text }) => {
        return {
          url: `messages?chatId=${chatId}`,
          method: 'POST',
          data: {
            text,
          },
        }
      },
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Messages', id: chatId },
      ],
    }),
    deleteMessage: builder.mutation({
      query: ({ messageId }) => {
        return {
          url: `messages/${messageId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, { messageId }) => [
        { type: 'Messages', id: messageId },
      ],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useGetChatsQuery,
  useGetChatRecipientQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
} = chatApi
