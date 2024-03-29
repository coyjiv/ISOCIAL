import { NavLink, useNavigate } from "react-router-dom";
import "./Chat.scss";
import { Avatar } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDeleteChatMutation } from "../../store/services/chatService.js";
import { useEffect } from "react";

const ChatItem = ({ chatId, chatName, lastMessage, chatAvatar }) => {
  const [deleteChat, { error }] = useDeleteChatMutation();

  useEffect(() => {
    if (error) {
      console.error("Ошибка при удалении чата:", error.message);
    }
  }, [error]);

  const navigate = useNavigate();

  const handleDeleteChat = async (chatId) => {
    await deleteChat(chatId);
    navigate("/chats", { replace: true });
  };

  return (
    <NavLink
      to={`/chats/${chatId}`}
      state={{ chatId }}
      className={({ isActive }) =>
        isActive ? "chat-item active-link" : "chat-item"
      }
    >
      <Avatar src={chatAvatar} alt="avatar" />
      <div className="chat-info-wrapper">
        <h3>{chatName}</h3>
        <p className="last-message">{lastMessage}</p>
      </div>
      <div className="chat-options">
        <button
          className="delete-button"
          onClick={() => handleDeleteChat(chatId)}
        >
          <AiOutlineDelete className="delete-icon" />
        </button>
      </div>
    </NavLink>
  );
};

ChatItem.propTypes = {
  chatId: PropTypes.number.isRequired,
  chatName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  chatAvatar: PropTypes.string.isRequired,
};

export default ChatItem;
