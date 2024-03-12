/* eslint-disable no-unused-vars */

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Chat.scss";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState } from "react";



const ChatItem = ({ handleDeleteChat, chatId, chatName, lastMessage, lastMessageBy, lastMessageDate, chatAvatar }) => {
  console.log(chatAvatar);
  const userId = Number(localStorage.getItem('userId'));
 
  

 /*const currentDate = new Date();
 const timeDif = lastMessageDate.getDay();
 console.log(timeDif);*/

  return (
    <Link to={`/chats/${chatId}`} state={{chatId}}  className="chat-item">
      <div className='message-avatar'><img src={chatAvatar} alt="" /></div>
      <div className="chat-info">
       <h3>{chatName}</h3>
       <span className="last-info">{lastMessageBy === userId ? 'You' : 'User'} sent message 
       </span>
      </div>
      
      <div className='chat-options'>
        <div className='chat-options-option' onClick={() => handleDeleteChat(chatId)}><AiOutlineDelete /></div>
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