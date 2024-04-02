import styles from "./chatMessages.module.scss";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchChatMessages } from "../../../store/actions/chat";
import { incrementSelectedChatMessagesPage } from "../../../store/chatSlice";
import { useEffect } from "react";
import "../Chat.scss";
import Message from "../Message";
import PropTypes from "prop-types";

const ChatMessages = ({ pendingChat = false }) => {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.chat.selectedChatMessages);

  const fetchMoreData = () => {
    dispatch(
      fetchChatMessages({ chatId: selectedChat.id, page: messages.page + 1 }),
    );
    dispatch(incrementSelectedChatMessagesPage());
  };

  useEffect(() => {
    if (messages.status === "idle" && selectedChat?.id) {
      dispatch(
        fetchChatMessages({ chatId: selectedChat?.id, page: messages.page }),
      );
    }
  }, [dispatch, messages.page, messages.status, selectedChat?.id]);

  const scrollToBottom = () => {
    const infiniteWrapper = document.getElementById("messages");

    if (infiniteWrapper) {
      const contentHeight = infiniteWrapper.clientHeight;
      infiniteWrapper.scrollTo(0, contentHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.data]);

  return (
    <div className={styles.messagesWrapper} id="messages">
      {pendingChat || messages.data.length === 0 ? (
        <p className={styles.empty}>Start by writing a message</p>
      ) : (
        <InfiniteScroll
          inverse={true}
          dataLength={messages.data.length}
          next={fetchMoreData}
          hasMore={messages.hasNext}
          loader={<h4>Loading...</h4>}
          className={styles.messagesList}
          scrollableTarget="messages"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: "5px",
          }}
        >
          {messages.data.map((message) => (
            <Message
              key={message.id}
              message={message}
              selectedChat={selectedChat}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

ChatMessages.propTypes = {
  pendingChat: PropTypes.bool,
};

export default ChatMessages;
