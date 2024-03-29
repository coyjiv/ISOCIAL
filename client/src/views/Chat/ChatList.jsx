/* eslint-disable no-unused-vars */
//libs
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//import { withLayout } from "../../hooks/withLayout"
import { AiOutlinePlus } from "react-icons/ai";

import ChatItem from "./ChatItem";
import "./Chat.scss";
import styles from './chatList.module.scss'
import {
  useGetChatsQuery,
  useCreateChatMutation,
} from "../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../store/chatSlice";
import { useGetFriendsListQuery } from "../../store/services/friendService.js";
import { ChatModal } from "./ChatModal.jsx";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { withWebsocket } from "../../hooks/withWebsocket.jsx";

const ChatList = () => {
  //   Код снизу или не нужен или был закоменчен, пока не нужен, потом удалить если что

  // const dispatch = useDispatch();
  // const chatStore = useSelector((state) => state.chat.chats);
  // const [receiverId, setReceiverId] = useState(1);
  // const [text, setText] = useState("asasasd");
  // const [attachments, setAttachments] = useState([]);

  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { data: friends, isLoading, isSuccess } = useGetFriendsListQuery({ id: localStorage.getItem('userId'), page });


  const { data: chats } = useGetChatsQuery(page);

  console.log(chats);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const isEmptyScreen = chats && chats?.content.length === 0 && !isLoading && isSuccess;

  return (
    <div className="chats">
      {/* <button className="add-chat" onClick={handleOpen}>
        <AiOutlinePlus className="add-chat__plus" />
      </button> */}

      {isOpen && friends && (
        <ChatModal
          open={isOpen}
          chatId={chats}
          handleClose={handleClose}
          friends={friends?.content}
          modalText="Select Friend"
        />
      )}

      {!isEmptyScreen ?

        <div className="chat-list">
          {chats &&
            chats.content.map((chat, i) => (
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

        : <div className={styles.emptyWrapper}>
          <h1>Hi there!</h1>
          <p>To write a message, tap on the button on right bottom</p>
        </div>

      }



      <Fab onClick={handleOpen} sx={{ position: 'fixed', bottom: '20px', right: '20px' }} color="primary" aria-label="edit">
        <EditIcon />
      </Fab>
    </div>
  );
};

const ChatListWithWebsocket = withWebsocket(ChatList);

export default ChatListWithWebsocket
