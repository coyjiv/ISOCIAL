/* eslint-disable no-unused-vars */
//libs
import { Link, useNavigate } from "react-router-dom";

import { withLayout } from "../../hooks/withLayout"

import ChatList from "./ChatList";
import Chat from "./Chat";
import "./Chat.scss";

const ChatContainer = () => {

  return (
    <div className="chat-container"><ChatList /><Chat /></div>
  );
};

const Chats = withLayout(ChatContainer)
export default Chats