import { useEffect } from "react";
import "./Chat.scss";
import {
  useGetChatRecipientQuery,
} from "../../store/services/chatService";
import { useParams, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { withLayout } from "../../hooks/withLayout";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "../../store/chatSlice";
import ChatView from "./ChatView";



const ChatPage = () => {
  const navigate = useNavigate();
  const { id: paramsId } = useParams();
  console.log(paramsId, "paramsId in Chat component");
  if (!paramsId) {
    console.log("No params id");

    navigate('/chats')
  }

  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const { data: chatData, isLoading, isSuccess } = useGetChatRecipientQuery(paramsId, { skip: !paramsId });
  console.log(chatData, "chat data");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      console.log("Chat not found");
      navigate('/chats')
    }
  }, [isLoading, isSuccess, navigate])

  useEffect(() => {
    if (selectedChat === null && (chatData && chatData?.id)) {
      dispatch(setSelectedChat(chatData));
    }
  }, [chatData, dispatch, selectedChat])

  useEffect(() => {
    return () => {
      dispatch(setSelectedChat(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ChatView id={paramsId} />
  );
};

ChatPage.propTypes = {
  id: PropTypes.string,
};

export const Chat = withLayout(ChatPage);
