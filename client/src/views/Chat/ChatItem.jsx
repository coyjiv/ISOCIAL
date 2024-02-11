import {Link, useNavigate, useSearchParams} from "react-router-dom";
import "./Chat.scss";

const ChatItem = ({ name, lastMessage, timestamp }) => {
  return (
    <Link to={`/chats/${id}`} className="chat-item">
      <div className='message-avatar'></div><h3>{name}</h3>
      
    </Link>
  );
};

export default ChatItem;