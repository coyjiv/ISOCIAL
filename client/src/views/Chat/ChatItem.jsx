/* eslint-disable no-unused-vars */

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Chat.scss";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";


const ChatItem = ({ chatId, chatName, lastMessage, chatAvatar }) => {
  return (
    <Link to={`/chats/${chatId}`} state={{ chatId }} className="chat-item">
      <div className='message-avatar'><img src="chatAvatar" alt="" /></div><h3>{chatName}</h3>
      <div className='chat-options'>
        <div className='chat-options-option'><AiOutlineDelete /></div>
        <div className='chat-options-option'></div>
        <div className='chat-options-option'></div>
      </div>
    </Link>
  );
};

ChatItem.propTypes = {
  chatId: PropTypes.string.isRequired,
  chatName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  chatAvatar: PropTypes.string.isRequired,
};

export default ChatItem;