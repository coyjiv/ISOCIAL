//libs
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import { API_URL, instance } from "../../api/config";

import { withLayout } from "../../hooks/withLayout"


import ChatItem from './ChatItem';
import "./Chat.scss"

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await instance.get('http://localhost:9000/api/chats?page=0&quantity=10');
        console.log(response);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        //setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatItem
          chatId={chat.id}
          chatName={chat.chatName}
          lastMessage={chat.lastMessage}
          chatAvatar={chat.avatarUrl}
        />
      ))}
    </div>
  );
};

const Chats = withLayout(ChatList)
export default Chats