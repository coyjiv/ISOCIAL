import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
// import { useState, useRef } from 'react'
// import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChats } from "../../../../store/actions/chat";

const MessengerButton = () => {
    // const ref = useRef(null)
    // const [isMessengerOpen, setIsMessengerOpen] = useState(false)
    const dispatch = useDispatch()
    const chats = useSelector(state => state.chat.chats)

    const location = useLocation().pathname

    const isActive = location.includes('/chats') || location.includes('/chat')

    // const handleClickOutside = () => {
    //     setIsMessengerOpen(false)
    // }

    // const handleClickInside = () => {
    //     setIsMessengerOpen(!isMessengerOpen)
    // }

    // useOnClickOutside(ref, handleClickOutside)

    useEffect(() => {
        if (chats.status === 'idle') {
            dispatch(fetchChats({ page: 0, quantity: 10 }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const messengerButtonClasses = classNames({
        [styles.messengerButton]: true,
        [styles.messengerButtonActive]: isActive
    })

    return (
        <button
            //  ref={ref}
            className={messengerButtonClasses}
        //    onClick={handleClickInside}
        >
            {chats.unread > 0 && <span className={styles.unreadMessages}>{chats.unread}</span>}
            {isActive ? <RiMessengerFill /> : <RiMessengerLine />}
        </button>
    )
}

export default MessengerButton