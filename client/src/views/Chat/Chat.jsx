import { useEffect } from "react";
import "./Chat.scss";
import { useGetChatRecipientQuery } from "../../store/services/chatService";
import { useParams, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { withLayout } from "../../hooks/withLayout";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "../../store/chatSlice";
import ChatView from "./ChatView";

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: paramsId } = useParams();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const {
    data: chatData,
    isLoading,
    isSuccess,
  } = useGetChatRecipientQuery(paramsId, { skip: !paramsId });

  if (!paramsId) {
    navigate("/chats");
  }

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      navigate("/chats");
    }
  }, [isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (selectedChat === null && chatData && chatData?.id) {
      dispatch(setSelectedChat(chatData));
    }
  }, [chatData, dispatch, selectedChat]);

  return <ChatView id={paramsId} />;
};

ChatPage.propTypes = {
  id: PropTypes.string,
};

export const Chat = withLayout(ChatPage);
