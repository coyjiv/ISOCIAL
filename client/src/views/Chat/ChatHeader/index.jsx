import PropTypes from 'prop-types'
import { Avatar, IconButton } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa6";
import styles from './chatHeader.module.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StyledBadge } from '../../../components/layout/Navbar/actions/actions.styled';

const ChatHeader = ({ mode }) => {
    const chatInfo = useSelector(state => mode === 'chat' ? state.chat.selectedChat : state.chat.pendingChat)
    const navigate = useNavigate();
    const backAction = () => {
        navigate('/chats')
    }
    return (
        <header className={styles.chatHeader}>
            <nav>
                <ul className={styles.chatHeaderList}>
                    <li><IconButton onClick={backAction}><FaArrowLeft size={'18px'} /></IconButton></li>
                    <li>
                        <div className={styles.chatInfo}>
                            {chatInfo?.receiverStatus !== "ONLINE" ? < Avatar sx={{ width: '35px', height: '35px' }} src={chatInfo?.avatarUrl} alt='user' /> :
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt="User profile avatar" src={chatInfo?.avatarUrl} />
                                </StyledBadge>}
                            <p>{chatInfo?.chatName}</p>
                        </div>
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