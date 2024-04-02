import { Link } from "react-router-dom";
import style from './styles.module.scss'
import PropTypes from 'prop-types';
import { useMediaQuery } from "@mui/material";

const ToastMessage = ({ type, msg, link }) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const title =
        type === "MESSAGE" ? isMobile ? msg.senderName : `New message from ${msg.senderName}`
            : type === "REPOST" ?
                `${msg?.senderName} reposted your post`
                : type === "FRIEND" ? `New friend request from ${msg.senderName}`
                    : type === "SUBSCRIPTION" ? `${msg?.senderName} created new post`
                        : type === "LIKE_POST" ? `${msg?.likerName} liked your post`
                            : type === "LIKE_COMMENT" ? `${msg?.likerName} liked your comment`
                                : type === "COMMENT" ? `${msg?.commenterName} commented your post` : ''


    return (
        <>
            <Link to={link} className={style.container}>
                <p className={style.title}>{title}</p>
                {msg?.text && msg?.text?.length > 0 && <p className={style.text}>{msg.text}</p>}
            </Link>
        </>
    );
};

ToastMessage.propTypes = {
    type: PropTypes.string,
    msg: PropTypes.object,
    link: PropTypes.string
}

export default ToastMessage;
