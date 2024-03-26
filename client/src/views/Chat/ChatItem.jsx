import { Link, useNavigate } from "react-router-dom";
import "./Chat.scss";
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
    <Link to={`/chats/${chatId}`} state={{ chatId }} className="chat-item">
      <div className="message-avatar">
        <img className="avatar-img" src={chatAvatar} alt="" />
      </div>
      <h3>{chatName}</h3>
      <div className="chat-options">
        <button
          className="delete-button"
          onClick={() => handleDeleteChat(chatId)}
        >
          <AiOutlineDelete className="delete-icon" />
        </button>
      </div>
    </Link>
  );
};

ChatItem.propTypes = {
  chatId: PropTypes.number.isRequired,
  chatName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  chatAvatar: PropTypes.string.isRequired,
};

export default ChatItem;
