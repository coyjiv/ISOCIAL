import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDeleteChatMutation } from "../../../store/services/chatService.js";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import styles from './chatItem.module.scss'
import { clearPendingChat, removeChat } from "../../../store/chatSlice.js";
import { getLastMessageDate } from "../../../utils/helpers/getLastMessageDate.js";


const ChatItem = ({ chatId = '', chatName, lastMessage, lastMessageDate, chatAvatar }) => {
    const pendingChat = useSelector((state) => state.chat.pendingChat);
    const dispatch = useDispatch();

    const isPendingChat = !chatId && !!pendingChat?.receiverId;
    const link = isPendingChat ? `/chat` : `/chats/${chatId}`;

    const [deleteChat] = useDeleteChatMutation();

    const chatItemClasses = (isActive) => classNames({
        [styles.chatItem]: true,
        [styles.chatItemActive]: isActive
    })

    const navigate = useNavigate();

    const handleDeleteChat = async (chatId) => {
        if (isPendingChat) {
            navigate("/chats", { replace: true });
            return dispatch(clearPendingChat());
        }
        await deleteChat(chatId).then(() => {
            dispatch(removeChat(chatId));
        });
        navigate("/chats", { replace: true });
    };


    const messageDate = getLastMessageDate(lastMessageDate);

    return (
        <NavLink
            to={link}
            state={{ chatId }}
            className={({ isActive }) =>
                chatItemClasses(isActive)
            }
        >
            <Avatar src={chatAvatar} alt="avatar" />
            <div className={styles.chatInfoWrapper}>
                <h3>{chatName}</h3>
                {lastMessage && <p className={styles.lastMessage}>{lastMessage}</p>}
            </div>
            <div className={styles.chatOptions}>
                <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteChat(chatId)}
                >
                    <AiOutlineDelete className={styles.deleteIcon} />
                </button>
                {!isPendingChat && <span className={styles.lastMessageTime}>{messageDate}</span>}
            </div>
        </NavLink>
    );
};

ChatItem.propTypes = {
    chatId: PropTypes.number,
    chatName: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    lastMessageDate: PropTypes.string,
    chatAvatar: PropTypes.string.isRequired,
};

export default ChatItem;
