import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import styles from "./chatItem.module.scss";
import {
  clearPendingChat,
  removeChat,
  setSelectedChat,
} from "../../../store/chatSlice.js";
import { getLastMessageDate } from "../../../utils/helpers/getLastMessageDate.js";
import { useParams } from "react-router";
import { deleteChat } from "../../../store/actions/chat.js";

const ChatItem = ({
  chatId = "",
  chatName,
  lastMessage,
  lastMessageDate,
  chatAvatar,
}) => {
  const pendingChat = useSelector((state) => state.chat.pendingChat);
  // const selectedChat = useSelector((state) => state.chat.selectedChat);

  const chats = useSelector((state) => state.chat.chats.data);
  const dispatch = useDispatch();
  const { id } = useParams();

  const isPendingChat = !chatId && !!pendingChat?.receiverId;
  const link = isPendingChat ? `/chat` : `/chats/${chatId}`;

  const chatItemClasses = (isActive) =>
    classNames({
      [styles.chatItem]: true,
      [styles.chatItemActive]: isActive,
    });

  const navigate = useNavigate();

  // const handleDeleteChat = async (e) => {
  //   e.preventDefault();

  //   if (isPendingChat) {
  //     dispatch(clearPendingChat());
  //     return setTimeout(() => {
  //       navigate("/chats", { replace: true });
  //     }, 0);
  //   }

  //   dispatch(removeChat(chatId));
  //   dispatch(deleteChat({ chatId }));

  //   if (id === chatId.toString()) {
  //     setTimeout(() => {
  //       navigate("/chats", { replace: true });
  //     }, 0);
  //   }
  // };

  const handleDeleteChat = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering navigation to the chat

    if (isPendingChat) {
      dispatch(clearPendingChat());
      navigate("/chats", { replace: true });
    } else {
      try {
        await dispatch(deleteChat({ chatId })).unwrap();
        dispatch(removeChat(chatId));
        if (id === chatId.toString()) {
          navigate("/chats", { replace: true });
        }
      } catch (error) {
        console.error("Failed to delete chat:", error);
        // Handle error (e.g., display a notification)
      }
    }
  };


  const changeSelectedChat = (chatId) => {
    const newChat = chats.find((el) => el.id === chatId);
    if (newChat) {
      dispatch(setSelectedChat(newChat));

      setTimeout(() => {
        navigate(`/chats/${chatId}`);
      }, 0);
    }
  };

  const messageDate = getLastMessageDate(lastMessageDate);

  return (
    <div onClick={() => changeSelectedChat(chatId)}>
      <NavLink
        to={link}
        state={{ chatId }}
        className={({ isActive }) => chatItemClasses(isActive)}
      >
        <Avatar src={chatAvatar} alt="avatar" />
        <div className={styles.chatInfoWrapper}>
          <h3>{chatName}</h3>
          {lastMessage && <p className={styles.lastMessage}>{lastMessage}</p>}
        </div>
        <div className={styles.chatOptions}>
          <button className={styles.deleteButton} onClick={handleDeleteChat}>
            <AiOutlineDelete className={styles.deleteIcon} />
          </button>
          {!isPendingChat && (
            <span className={styles.lastMessageTime}>{messageDate}</span>
          )}
        </div>
      </NavLink>
    </div>
  );
};

ChatItem.propTypes = {
  chatId: PropTypes.number,
  chatName: PropTypes.string,
  lastMessage: PropTypes.string,
  lastMessageDate: PropTypes.string,
  chatAvatar: PropTypes.string,
};

export default ChatItem;
