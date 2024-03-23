import { RiNotification2Fill, RiNotification2Line } from "react-icons/ri";
import { useState, useRef } from 'react'
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import {useGetNotificationQuery} from "../../../../store/services/notification.js";

const NotificationButton = () => {
    const {data, isLoading, isSuccess} = useGetNotificationQuery({recieverId:localStorage.getItem('userId'), page:0, quantity:10})
    console.log(data, isLoading, isSuccess)
    const ref = useRef(null)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

    const handleClickOutside = () => {
        setIsNotificationsOpen(false)
    }

    const handleClickInside = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
    }

    useOnClickOutside(ref, handleClickOutside)

    const messengerButtonClasses = classNames({
        [styles.messengerButton]: true,
        [styles.messengerButtonActive]: isNotificationsOpen
    })


    return (
        <button ref={ref} className={messengerButtonClasses} onClick={handleClickInside}>
            {isNotificationsOpen ? <RiNotification2Fill /> : <RiNotification2Line />}
        </button>
    )
}

export default NotificationButton