import { useState, useEffect, useRef } from "react";
import "./Chat.scss";
import cx from "classnames";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteMessageMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../store/services/chatService";
import { AutosizeTextareaSend } from "../../components/AutosizeTextareaSend";
import * as Yup from "yup";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { withWebsocket } from "../../hooks/withWebsocket";

const validationScheme = Yup.object().shape({
  text: Yup.string()
    .required("Message is required")
    .max(260, "Message is too long"),
});

const ChatPage = ({ id }) => {
  const { id: paramsId } = useParams();

  const chatId = id || paramsId;

  const [messagesData, setMessages] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const contentRef = useRef();

  const { data: messages, isLoading } = useGetMessagesQuery(
    { page, chatId },
    { skip: !chatId },
  );
  const [sendMessage] = useSendMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!isLoading && messages && messages.length > 0) {
      setMessages(messages);
    }
  }, [isLoading, messages]);

  const handleSendMessage = async (values) => {
    try {
      const response = await sendMessage({ chatId, text: values.text });
      console.log(response.data);
      setMessages([...messagesData, response.data]);
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  const handleDeleteMessage = async (item) => {
    try {
      console.log(item.id);
      await deleteMessage({ messageId: item.id });
      setMessages(messagesData.filter((message) => message.id !== item.id));
    } catch (error) {
      console.error("Delete message error:", error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const scrollBottom = () => {
    const contentHeight = contentRef.current.clientHeight;
    console.log(contentRef);
    console.log(contentHeight);
    window.scrollTo({
      bottom: contentHeight,
      behavior: "smooth",
    });
  };

  /*useEffect(scrollBottom, []);*/

  return (
    <>
      <div className="message-container">
        <div className="chat-messages" ref={contentRef}>
          {messagesData.map((message, index) => (
            <div
              key={index}
              className={cx(
                "message-item",
                { user: message.senderId === userId },
                { bot: message.senderId !== userId },
              )}
            >
              <div
                className={cx(
                  messages[index - 1] === undefined || {
                    "message-avatar": messages[index - 1].senderId !== userId,
                  },
                )}
              ></div>
              <div className="message-body">
                <div className="message-text">{message.text}</div>
                <div className="message-img"></div>
              </div>
              <div className="message-options">
                <div
                  className="message-options-option"
                  onClick={() => handleDeleteMessage(message)}
                >
                  <AiOutlineDelete />
                </div>
                <div className="message-options-option"></div>
                <div className="message-options-option"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <AutosizeTextareaSend
            onSubmit={handleSendMessage}
            placeholder={"Type your message..."}
            validationScheme={validationScheme}
          />
        </div>
      </div>
    </>
  );
};

ChatPage.propTypes = {
  id: PropTypes.number,
};

export const Chat = withWebsocket(ChatPage);
