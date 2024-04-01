import styles from './notificationList.module.scss'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material';
import { userAvatar } from '../../../../data/placeholders'


const NotificationItem = (props) => {
    const { creationDate, eventType, senderAvatar, senderName, page, postId } = props

    let messageContent
    let dateMassage

    const userId = localStorage.getItem('userId')
    let differenceInMilliseconds = new Date() - new Date(creationDate);

    if (differenceInMilliseconds >= 24 * 60 * 60 * 1000) {

        const days = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
        dateMassage = days === 1 ? `${days} day ago` : `${days} days ago`;

    } else if (differenceInMilliseconds >= 60 * 60 * 1000) {

        const hours = Math.floor(differenceInMilliseconds / (60 * 60 * 1000));
        dateMassage = hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;

    } else if (differenceInMilliseconds >= 60 * 1000) {

        const minutes = Math.floor(differenceInMilliseconds / (60 * 1000));
        dateMassage = minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;

    } else {
        const seconds = Math.floor(differenceInMilliseconds / 1000);
        dateMassage = seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    }


    switch (eventType) {
        case 'MESSAGE_LIKE':
            messageContent = `Liked your message`;
            break;
        case 'COMMENT_LIKE':
            messageContent = `Liked your comment`;
            break;
        case 'POST_LIKE':
            messageContent = `Liked your post`;
            break;
        case 'NEW_POST':
            messageContent = `Shared a new post`;
            break;
        case 'REPOST':
            messageContent = `Reposted post`;
            break;
        case 'COMMENT':
            messageContent = `Commented your post`;
            break;

    }

    const link = (eventType === 'MESSAGE_LIKE') ? `/profile/${userId}` : `/post/${postId}`

    return (
        <Link to={link}>
            <li className={styles.notificationItem}>
                {/* <div className={styles.avatarImgContainer}> */}
                <Avatar className={styles.avatarImg} src={userAvatar(senderAvatar)} alt="avatar" />
                {/* </div> */}
                <div className={`${page ? styles.notificationText : styles.notificationContent}`}>
                    <p className={styles.userName}>{senderName} <span
                        className={`${page ? styles.massage : styles.massageDisplay}`}>{messageContent}</span></p>
                    <p className={`${page ? styles.massageDisplay : styles.massage}`}>{messageContent}</p>
                    <p className={styles.dateMassage}>{dateMassage}</p>
                </div>
            </li>
        </Link>
    )
}

NotificationItem.propTypes = {
    creationDate: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    senderAvatar: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    page: PropTypes.bool.isRequired,
    postId: PropTypes.number
}

export default NotificationItem