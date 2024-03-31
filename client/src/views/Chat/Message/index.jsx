import cx from 'classnames'
import { Avatar } from '@mui/material'
import { userAvatar } from '../../../data/placeholders'
import { useGetProfileByIdQuery } from '../../../store/services/profileService'
// import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './message.module.scss'

const Message = ({ message, selectedChat }) => {
    const userId = Number(localStorage.getItem('userId'));
    const { data: profile } = useGetProfileByIdQuery(localStorage.getItem('userId'));

    // const messageDate = date => {
    //     return moment(date).format('HH:mm')
    // }

    return (
        <div
            className={cx(
                styles.messageItem,
                { [styles.user]: message.senderId === userId },
                { [styles.bot]: message.senderId !== userId },
            )}
        >
            <Avatar src={message.senderId !== userId ? selectedChat?.avatarUrl : profile && userAvatar(profile)} />
            <div className={styles.messageBody}>
                <div className={styles.messageText}>{message.text}
                    {/* <span className={styles.messageSentAt}>{messageDate(message.lastModifiedDate)}</span> */}
                </div>
                <div className="message-img"></div>
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.shape({
        senderId: PropTypes.number,
        text: PropTypes.string,
        lastModifiedDate: PropTypes.string,
    }),
    selectedChat: PropTypes.shape({
        avatarUrl: PropTypes.string,
    }),
}

export default Message