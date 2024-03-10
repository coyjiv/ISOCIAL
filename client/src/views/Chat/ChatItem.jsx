/* eslint-disable no-unused-vars */

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Chat.scss";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDeleteChatMutation, useGetChatsQuery } from '../../store/services/chatService';
import { useDispatch } from "react-redux";


const ChatItem = ({ chat, chatId, chatName, lastMessage, lastMessageBy, lastMessageDate, chatAvatar }) => {
  console.log(chatAvatar);
  const userId = Number(localStorage.getItem('userId'));
  const [deleteChat] = useDeleteChatMutation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { data: chats, isLoading } = useGetChatsQuery(page);

  const handleDeleteChat = async (item) => {

    try {
      console.log(item.id);
      await deleteChat({ chatId: item.id })
      dispatch(useGetChatsQuery(page))
    } catch (error) {
      console.error('Delete message error:', error);
    }
  };

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
        <div className='chat-options-option' onClick={() => handleDeleteChat(chat)}><AiOutlineDelete /></div>
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