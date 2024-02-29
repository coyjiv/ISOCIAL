//libs
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { withLayout } from "../../hooks/withLayout"


import ChatItem from './ChatItem';
import "./Chat.scss"
import { useGetChatsQuery } from "../../store/services/chatService";

const ChatList = () => {
  const [page, setPage] = useState(0)
  const { data: chats } = useGetChatsQuery(page);

  return (
    <div className="chat-list">
      {chats && chats.map((chat, i) => (
        <ChatItem
          key={i}
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