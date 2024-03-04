import {Link} from "react-router-dom";
import "./Chat.scss";
import PropTypes from "prop-types";

const ChatItem = ({ chatId, chatName }) => {
  return (
    <Link to={`/chats/${chatId}`} className="chat-item">
      <div className='message-avatar'><img src="chatAvatar" alt="" /></div><h3>{chatName}</h3>
      
    </Link>
  );
};

ChatItem.propTypes = {
    chatId: PropTypes.string,
    chatName: PropTypes.string,
}
export default ChatItem;