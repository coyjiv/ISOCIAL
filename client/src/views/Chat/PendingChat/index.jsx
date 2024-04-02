/* eslint-disable react-hooks/exhaustive-deps */
import { AutosizeTextareaSend } from "../../../components/AutosizeTextareaSend";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { withLayout } from "../../../hooks/withLayout";
import {
    useCreateChatMutation,
    useGetChatsQuery,
} from "../../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "../ChatHeader";
import ChatMessages from "../ChatMessages";
import { useNavigate } from "react-router-dom";

import { clearPendingChat, setSelectedChat } from "../../../store/chatSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ChatItem from "../ChatItem";
import styles from "./pendingChat.module.scss";
import "../Chat.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchBase, SearchContainer } from "../../../components/SidebarSearch/SidebarSearch.styled";
import { SearchIcon } from "../../../components/MainSearch/MainSearch.styled";
import { userAvatar } from "../../../data/placeholders";

const validationScheme = Yup.object().shape({
    text: Yup.string()
        .required("Message is required")
        .max(260, "Message is too long"),
});

const PendingChatView = () => {
    const chatInfo = useSelector((state) => state.chat.pendingChat);
    const dispatch = useDispatch();

    const [chats, setChats] = useState([chatInfo]);
    const [page, setPage] = useState(0);

    const [value, setValue] = useState("");
    const [inputActive, setInputActive] = useState(false);

    const filteredChats = chats.filter((chat) =>
        chat?.chatName?.toLowerCase()?.includes(value.toLowerCase()),
    );

    const handleChange = (value) => {
        setValue(value);
    };

    const handleBlur = () => {
        setInputActive(false);
    };

    const navigate = useNavigate();
    const { data: existingChats, isSuccess: isChatsLoaded } =
        useGetChatsQuery(page);

    const [createChat] = useCreateChatMutation();

    const handleCreateChat = (values) => {
        createChat({
            receiverId: chatInfo.receiverId,
            data: { text: values.text, attachments: [] },
        }).then((res) => {
            if (res.error) {
                toast.error("Failed to create chat. Please try again later.");
                return navigate("/chats/");
            }
            dispatch(setSelectedChat(res?.data));
            navigate("/chats/" + res?.data?.id);
        });
    };

    useEffect(() => {
        if (!chatInfo?.receiverId) {
            navigate("/chats");
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearPendingChat());
        };
    }, []);

    useEffect(() => {
        if (isChatsLoaded && existingChats?.content) {
            setChats((prevData) => {
                const dataMap = new Map();

                prevData.forEach((item) => dataMap.set(item.id, item));

                existingChats.content.forEach((item) => {
                    if (!dataMap.has(item.id)) {
                        dataMap.set(item.id, item);
                    }
                });

                return Array.from(dataMap.values());
            });
        }
    }, [isChatsLoaded, existingChats]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className={styles.chatAsideMainWrapper}>
            <aside className={styles.chatAsideWrapper}>
                <div className={styles.chatAsideHeader}>
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
                </div>
                {inputActive ?
                    <div className={styles.chatList}>
                        {filteredChats &&
                            filteredChats?.map((chat) => (
                                <ChatItem
                                    key={chat?.id}
                                    chatId={chat?.id}
                                    chatName={chat?.chatName}
                                    lastMessage={chat?.lastMessage}
                                    lastMessageDate={chat?.lastMessageDate}
                                    chatAvatar={userAvatar({ firstName: chat?.chatName.split(' ')[0], lastName: chat?.chatName.split(' ')[1], avatarsUrl: [chat?.avatarUrl] })}
                                />
                            ))}
                    </div>
                    :

                    <InfiniteScroll
                        dataLength={chats.length}
                        next={fetchMoreData}
                        hasMore={existingChats?.hasNext}
                        loader={
                            <div style={{ display: "flex", width: "100%" }}>Loading...</div>
                        }
                        className={"chat-list"}
                    >
                        {chats &&
                            chats?.map((chat, index) => (
                                <ChatItem
                                    key={chat?.id ?? index}
                                    chatId={chat?.id}
                                    chatName={chat?.chatName}
                                    lastMessage={chat?.lastMessage}
                                    chatAvatar={userAvatar({ firstName: chat?.chatName.split(' ')[0], lastName: chat?.chatName.split(' ')[1], avatarsUrl: [chat?.avatarUrl] })}
                                />
                            ))}
                    </InfiniteScroll>
                }
            </aside>
            <main className={styles.chatMainWrapper}>
                <ChatHeader mode="pendingChat" />
                <ChatMessages pendingChat />
                <div className={styles.chatTextAreaHolder}>
                    <AutosizeTextareaSend
                        onSubmit={handleCreateChat}
                        placeholder={"Type your message..."}
                        validationScheme={validationScheme}
                        textAreaClassname={styles.chatTextArea}
                        autoFocus
                    />
                </div>
            </main>
        </div>
    );
};

PendingChatView.propTypes = {
    id: PropTypes.string,
};

export const PendingChat = withLayout(PendingChatView);
