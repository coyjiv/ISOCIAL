import {Link, useNavigate, useSearchParams} from "react-router-dom";
import "./Chat.scss";
import { AiOutlineDelete } from "react-icons/ai";


const ChatItem = ({ chatId, chatName, lastMessage, chatAvatar }) => {
  console.log(chatAvatar);
  return (
    <Link to={`/chats/${chatId}`} state={{chatId}}  className="chat-item">
      <div className='message-avatar'><img src={chatAvatar} alt="" /></div><h3>{chatName}</h3>
      <div className='chat-options'>
        <div className='chat-options_option'><AiOutlineDelete /></div>
        <div className='chat-options_option'></div>
        <div className='chat-options_option'></div>
      </div>
    </Link>
  );
};

export default ChatItem;