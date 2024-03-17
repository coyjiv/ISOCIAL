/* eslint-disable no-unused-vars */
//libs
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as React from 'react';
import { MainSearch } from "../../components/MainSearch";
import { styled, useTheme } from '@mui/material/styles';



import ChatItem from './ChatItem';
import "./Chat.scss"
import { useGetChatsQuery, useCreateChatMutation, useDeleteChatMutation } from "../../store/services/chatService";
import { useGetFriendsListQuery } from "../../store/services/friendService";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../store/chatSlice";

const ChatList = () => {
  const userId = Number(localStorage.getItem('userId'));
  const dispatch = useDispatch();
  // const chatStore = useSelector((state) => state.chat.chats);
  const [chatData, setChats] = useState([]);
  const [page, setPage] = useState(0);
  const [receiverId, setReceiverId] = useState(3);
  const [text, setText] = useState('asasasd');
  const [attachments, setAttachments] = useState([]);
  const { data: chats, isLoading } = useGetChatsQuery(page);
  const [addChat] = useCreateChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const { data: friends } = useGetFriendsListQuery(userId);
  const [value, setValue] = useState("");
  const chatResponse = {"text": "string", "attachments": ["string"]};
  console.log(chatResponse.text);

  useEffect(() => {
    if (!isLoading && chats && chats.length > 0) {
      setChats(chats)
    }
  }, [isLoading, chats])

  const handleCreateChat = async (values) => {
    try {
      const response = await addChat({receiverId, text: values.text, attachments: values.attachments});
      console.log(response.data);
      //setChats([...chats, response.data]);
      dispatch(useGetChatsQuery(page));
      setChats(chats);
    } catch (error) {
      console.error('Create chat error:', error);
    }
  }

  const handleDeleteChat = async (itemId) => {

    try {
      console.log(itemId);
      await deleteChat({ chatId: itemId })
      setChats([]);
      //setChats(chats.filter((chat) => chat.id !== itemId));
      dispatch(useGetChatsQuery(page));
      setChats(chats);
    } catch (error) {
      console.error('Delete message error:', error);
    }
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className="chats">
      <div className="chats-head"><div className="add-chat" onClick={() => handleCreateChat(chatResponse)}><AiOutlinePlus className="add-chat__plus" /></div>
      <MainSearch value={value} searchItems={friends} onChange={handleChange} /></div>
      <div className="chat-list">
        {chats && chatData.map((chat, i) => (
          <ChatItem
            handleDeleteChat={handleDeleteChat}
            key={i}
            chatId={chat.id}
            chatName={chat.chatName}
            lastMessage={chat.lastMessage}
            lastMessageBy={chat.lastMessageBy}
            lastMessageDate={chat.lastMessageDate}
            chatAvatar={chat.avatarUrl}
          />
        ))}
        {(!chats || chats.length === 0) && <span className="no-chats">No chats yet</span>}

      </div>
    </div>
  );
};

export default ChatList