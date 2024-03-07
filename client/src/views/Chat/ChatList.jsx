//libs
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";


import ChatItem from './ChatItem';
import "./Chat.scss"
import { useGetChatsQuery, useCreateChatMutation } from "../../store/services/chatService";

const ChatList = () => {
  const [page, setPage] = useState(0);
  const [text, setText] = useState('text');
  const [attachment, setAttachment] = useState([21]);
  const { data: chats } = useGetChatsQuery(page);
  const [addChat] = useCreateChatMutation();
  

  return (
   <div className="chats">
    <div className="add-chat" onClick={() => addChat({receiverId, "text": "string", "attachments": ["string"]})}><AiOutlinePlus className="add-chat__plus"/></div>
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
      {(!chats || chats.length === 0) && <span className="no-chats">No chats yet</span>}
      
    </div>
   </div> 
  );
};

export default ChatList