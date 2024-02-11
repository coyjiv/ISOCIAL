//libs
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";


import ChatItem from './ChatItem';
import "./Chat.scss"

const ChatList = () => {
  const chats = [
    { id: 1, name: 'Chat 1', lastMessage: 'Hello!', timestamp: '2 minutes ago' },
    { id: 2, name: 'Chat 2', lastMessage: 'How are you?', timestamp: '1 hour ago' },
  ];

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          name={chat.name}
          lastMessage={chat.lastMessage}
          timestamp={chat.timestamp}
        />
      ))}
    </div>
  );
};

export default ChatList;