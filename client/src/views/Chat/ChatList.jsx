/* eslint-disable no-unused-vars */
//libs
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//import { withLayout } from "../../hooks/withLayout"
import { AiOutlinePlus } from "react-icons/ai";


import ChatItem from './ChatItem';
import "./Chat.scss"
import { useGetChatsQuery, useCreateChatMutation } from "../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../store/chatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  // const chatStore = useSelector((state) => state.chat.chats);
  const [page, setPage] = useState(0);
  const [receiverId, setReceiverId] = useState(2);
  const [text, setText] = useState('asasasd');
  const [attachments, setAttachments] = useState([]);
  const { data: chats, isLoading } = useGetChatsQuery(page);
  const [addChat] = useCreateChatMutation();

  // useEffect(() => {
  //   if (!isLoading && chats && chats.length > 0 && !chatStore.length) {
  //     dispatch(setChats(chats));
  //   }
  // }, [isLoading, chats, dispatch, chatStore.length]);


  return (
    <div className="chats">
      <div className="add-chat" onClick={() => addChat({ receiverId, data: { text, attachments } })}><AiOutlinePlus className="add-chat__plus" /></div>
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