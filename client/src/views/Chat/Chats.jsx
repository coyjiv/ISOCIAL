/* eslint-disable no-unused-vars */
//libs
import { Link, useNavigate } from "react-router-dom";

import { withLayout } from "../../hooks/withLayout"
import { useParams } from "react-router-dom";

import ChatList from "./ChatList";
import { Chat } from './Chat'
import "./Chat.scss";

const ChatContainer = () => {
  const { id } = useParams();

  return (
    <ChatList />
    // <div className="chat-container">
    //   {/* {id ? <Chat id={id} /> : <h1>No chats selected</h1>} */}
    // </div>
  );
};

const Chats = withLayout(ChatContainer)
export default Chats