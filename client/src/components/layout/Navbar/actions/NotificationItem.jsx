import styles from './notificationList.module.scss'

const NotificationItem = (props) => {
    const {creationDate, eventType, senderAvatar, senderName} = props

    let messageContent
    let dateMassage

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
        // Если прошла хотя бы одна секунда, выводим сколько секунд назад
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

    return (
        <li className={styles.notificationItem}>
            <div className={styles.avatarImgContainer}>
                <img className={styles.avatarImg} src={senderAvatar} alt="avatar"/>
            </div>
            <div className={styles.notificationContent}>
                <p className={styles.userName}>{senderName}</p>
                <p>{messageContent}</p>
                <p className={styles.dateMassage}>{dateMassage}</p>
            </div>

        </li>
    )
}

export default NotificationItem