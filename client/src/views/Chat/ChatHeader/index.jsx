import PropTypes from 'prop-types'
import { Avatar, IconButton } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa6";
import styles from './chatHeader.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StyledBadge } from '../../../components/layout/Navbar/actions/actions.styled';
import moment from 'moment';
import { userAvatar } from '../../../data/placeholders';

const ChatHeader = ({ mode }) => {
    const chatInfo = useSelector(state => mode === 'chat' ? state.chat.selectedChat : state.chat.pendingChat)
    const navigate = useNavigate();
    const backAction = () => {
        navigate('/chats')
    }

    const lastSeen = moment(chatInfo?.receiverLastSeen).fromNow();
    return (
        <header className={styles.chatHeader}>
            <nav>
                <ul className={styles.chatHeaderList}>
                    <li className={styles.chatHeaderListBack}><IconButton onClick={backAction}><FaArrowLeft size={'18px'} /></IconButton></li>
                    <li>
                        <Link to={'/profile/' + chatInfo?.receiverId} className={styles.chatInfo}>
                            {chatInfo?.receiverStatus !== "ONLINE" ? < Avatar sx={{ width: '40px', height: '40px' }} src={userAvatar({ firstName: chatInfo?.chatName?.split(' ')?.[0], lastName: chatInfo?.chatName?.split(' ')?.[1], avatarsUrl: [chatInfo?.avatarUrl] })} alt='user' /> :
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt="User profile avatar" src={userAvatar({ firstName: chatInfo?.chatName?.split(' ')?.[0], lastName: chatInfo?.chatName?.split(' ')?.[1], avatarsUrl: [chatInfo?.avatarUrl] })} />
                                </StyledBadge>}
                            <p>{chatInfo?.chatName}</p>
                            {chatInfo?.receiverStatus !== "ONLINE" && <span className={styles.lastSeen}>last seen: {lastSeen}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

ChatHeader.propTypes = {
    mode: PropTypes.oneOf(['pendingChat', 'chat'])
}

export default ChatHeader