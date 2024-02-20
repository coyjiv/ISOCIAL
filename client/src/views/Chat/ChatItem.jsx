import {Link, useNavigate, useSearchParams} from "react-router-dom";
import "./Chat.scss";

const ChatItem = ({ chatId, chatName, lastMessage, chatAvatar }) => {
  return (
    <Link to={`/chats/${chatId}`} className="chat-item">
      <div className='message-avatar'><img src="chatAvatar" alt="" /></div><h3>{chatName}</h3>
      
    </Link>
  );
};

export default ChatItem;