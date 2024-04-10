import cx from 'classnames'
import { Avatar } from '@mui/material'
import { userAvatar } from '../../../data/placeholders'
import { useGetProfileByIdQuery } from '../../../store/services/profileService'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './message.module.scss'
import { Link } from 'react-router-dom'
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { readMessage } from '../../../store/actions/chat'

const Message = ({ message, selectedChat }) => {
    const dispatch = useDispatch();
    const userId = Number(localStorage.getItem('userId'));
    const { data: profile } = useGetProfileByIdQuery(localStorage.getItem('userId'));

    const messageDate = date => {
        return moment(date).format('HH:mm')
    }

    useEffect(() => {
        if (message.senderId !== userId && message.status === "SENT") {
            dispatch(readMessage({ messageId: message.id }))
        }
    }, [dispatch, message.id, message.senderId, message.status, userId])

    return (
        <div
            className={cx(
                styles.messageItem,
                { [styles.user]: message.senderId === userId },
                { [styles.bot]: message.senderId !== userId },
            )}
        >
            <Link to={'/profile/' + selectedChat?.receiverId}><Avatar src={message.senderId !== userId ? userAvatar({ firstName: selectedChat?.chatName?.split(' ')?.[0], lastName: selectedChat?.chatName?.split(' ')?.[1], avatarsUrl: [selectedChat?.avatarUrl] }) : profile && userAvatar(profile)} /></Link>
            <div className={styles.messageBody}>
                <div className={styles.messageText}>{message.text}
                    {/* <span className={styles.messageSentAt}>{messageDate(message.lastModifiedDate)}</span> */}
                    <div>
                        {message.senderId === userId && <span>{message.status === "SEEN" ? <IoCheckmarkDone /> : <IoCheckmark />}</span>}
                        <span>{message.edited && 'Edited'}</span>
                        <span className={styles.messageSentAt}>{messageDate(message.lastModifiedDate)}</span>
                    </div>
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
        lastModifiedDate: PropTypes.any,
        attachments: PropTypes.array,
        chatId: PropTypes.number,
        edited: PropTypes.bool,
        id: PropTypes.number,
        senderName: PropTypes.string,
        status: PropTypes.string
    }),
    selectedChat: PropTypes.shape({
        avatarUrl: PropTypes.string,
        receiverId: PropTypes.number,
        chatName: PropTypes.string,
    }),
}

export default Message