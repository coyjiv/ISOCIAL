/* eslint-disable no-unused-vars */
//libs
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//import { withLayout } from "../../hooks/withLayout"
import { AiOutlinePlus } from "react-icons/ai";

import ChatItem from "./ChatItem";
import "./Chat.scss";
import {
  useGetChatsQuery,
  useCreateChatMutation,
} from "../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../store/chatSlice";
import { useGetFriendsListQuery } from "../../store/services/friendService.js";
import { ChatModal } from "./ChatModal.jsx";

const ChatList = () => {
  const dispatch = useDispatch();
  // const chatStore = useSelector((state) => state.chat.chats);
  const [page, setPage] = useState(0);
  const [receiverId, setReceiverId] = useState(1);
  const [text, setText] = useState("asasasd");
  const [attachments, setAttachments] = useState([]);
  const { data: chats, isLoading } = useGetChatsQuery(page);

  // const [addChat] = useCreateChatMutation();
  const { data: friends } = useGetFriendsListQuery(1);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div className="chats">
      <button className="add-chat" onClick={handleOpen}>
        <AiOutlinePlus className="add-chat__plus" />
      </button>

      {isOpen && (
        <ChatModal
          open={isOpen}
          chatId={chats}
          handleClose={handleClose}
          friends={friends}
          modalText="Select Friend"
        />
      )}

      <div className="chat-list">
        {chats &&
          chats.map((chat, i) => (
            <ChatItem
              key={i}
              chatId={chat.id}
              chatName={chat.chatName}
              lastMessage={chat.lastMessage}
              chatAvatar={chat.avatarUrl}
            />
          ))}
        {(!chats || chats.length === 0) && (
          <span className="no-chats">No chats yet</span>
        )}
      </div>
    </div>
  );
};

export default ChatList;
