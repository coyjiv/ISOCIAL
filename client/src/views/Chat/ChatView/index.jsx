/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SelectChatAside from "../SelectChatAside";
import classNames from "classnames";

import styles from "../chats.module.scss";
import pendingChatStyles from "../PendingChat/pendingChat.module.scss";
import {
  SearchBase,
  SearchContainer,
} from "../../../components/SidebarSearch/SidebarSearch.styled";
import { SearchIcon } from "../../../components/MainSearch/MainSearch.styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, sendMessage, updateChats } from "../../../store/actions/chat";
import PropTypes from "prop-types";
import ChatHeader from "../ChatHeader";
import ChatMessages from "../ChatMessages";
import { AutosizeTextareaSend } from "../../../components/AutosizeTextareaSend";
import * as Yup from "yup";

const validationScheme = Yup.object().shape({
  text: Yup.string()
    .required("Message is required")
    .max(260, "Message is too long"),
});

const ChatView = ({ id, hideCreateChat }) => {
  const wrapperClasses = classNames(
    styles.emptyWrapper,
    styles.emptyWrapperRight,
  );
  const [page, setPage] = useState(0);

  const chats = useSelector((state) => state.chat.chats);

  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [inputActive, setInputActive] = useState(false);

  const filteredChats = chats.data.filter((chat) =>
    chat?.chatName?.toLowerCase()?.includes(value.toLowerCase()),
  );

  const handleChange = (value) => {
    setValue(value);
  };

  const handleBlur = () => {
    setInputActive(false);
  };

  const isEmptyScreen =
    chats &&
    chats?.data?.length === 0 &&
    !chats.isLoading &&
    chats.error === null;

  const fetchMoreData = () => {
    dispatch(fetchChats({ page: page + 1 }));
    setPage((prevPage) => prevPage + 1);
  };

  const handleSendMessage = (values) => {
    dispatch(
      sendMessage({
        chatId: selectedChat.id,
        data: { text: values.text, attachments: [] },
      }),
    );
  };

  useEffect(() => {
    if (chats.status === "idle") {
      dispatch(fetchChats({ page: 0 }));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateChats(chats.data.map(chat => chat.id)));
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {!isEmptyScreen ? (
        <div className={styles.chatMainWrapper}>
          <SelectChatAside
            hideCreateChat={hideCreateChat}
            filteredChats={filteredChats}
            searchActive={inputActive}
            fetchMoreData={fetchMoreData}
            hasMore={chats.hasNext}
            input={
              <div className={styles.searchWrapper}>
                <SearchContainer>
                  <SearchIcon open={inputActive} />
                  <SearchBase
                    value={value}
                    onFocus={() => setInputActive(true)}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </SearchContainer>
              </div>
            }
            chats={chats.data}
          />
          {!id && !selectedChat ? (
            <div className={wrapperClasses}>
              <p>Please select a chat first</p>
            </div>
          ) : (
            <main className={pendingChatStyles.chatMainWrapper}>
              <ChatHeader mode="chat" />
              <ChatMessages />
              <div className={pendingChatStyles.chatTextAreaHolder}>
                <AutosizeTextareaSend
                  onSubmit={handleSendMessage}
                  placeholder={"Type your message..."}
                  validationScheme={validationScheme}
                  textAreaClassname={pendingChatStyles.chatTextArea}
                  autoFocus
                  withEmojiPicker={false}
                />
              </div>
            </main>
          )}
        </div>
      ) : (
        <div className={styles.emptyWrapper}>
          <h1>Hi there!</h1>
          <p>To write a message, tap on the button on right bottom</p>
        </div>
      )}
    </>
  );
};

ChatView.propTypes = {
  id: PropTypes.string,
  hideCreateChat: PropTypes.bool,
};

export default ChatView;
