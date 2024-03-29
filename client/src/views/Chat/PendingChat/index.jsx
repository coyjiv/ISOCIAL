import { AutosizeTextareaSend } from "../../../components/AutosizeTextareaSend";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { withWebsocket } from "../../../hooks/withWebsocket";
import { withLayout } from "../../../hooks/withLayout";
import { useCreateChatMutation } from "../../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "../ChatHeader";
import ChatMessages from "../ChatMessages";
import { useNavigate } from "react-router-dom";

import styles from './pendingChat.module.scss'
import { clearPendingChat, setSelectedChat } from "../../../store/chatSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const validationScheme = Yup.object().shape({
    text: Yup.string()
        .required("Message is required")
        .max(260, "Message is too long"),
});

const PendingChatView = () => {
    const navigate = useNavigate();
    const chatInfo = useSelector(state => state.chat.pendingChat)
    const dispatch = useDispatch();


    const [createChat] = useCreateChatMutation();

    const handleCreateChat = (values) => {
        createChat({ receiverId: chatInfo.receiverId, data: { text: values.text, attachments: [] } }).then((res) => {
            console.log(res);
            if (res.error) {
                toast.error("Failed to create chat. Please try again later.");
                return navigate('/chats/');
            }
            dispatch(setSelectedChat(res.data));
            navigate('/chats/' + res?.data?.id);
            dispatch(clearPendingChat);
        });
    }

    useEffect(() => {
        if (!chatInfo?.receiverId) {
            navigate('/chats')
        }
    }, [])

    useEffect(() => {

        return () => {
            dispatch(clearPendingChat());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className={styles.chatMainWrapper}>
            <ChatHeader mode='pendingChat' />
            <ChatMessages />
            <div className={styles.chatTextAreaHolder}>
                <AutosizeTextareaSend
                    onSubmit={handleCreateChat}
                    placeholder={"Type your message..."}
                    validationScheme={validationScheme}
                />
            </div>
        </main>
    );
};

PendingChatView.propTypes = {
    id: PropTypes.string,
};

export const PendingChat = withLayout(withWebsocket(PendingChatView));
