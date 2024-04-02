import { RiNotification2Fill, RiNotification2Line } from "react-icons/ri";
import { useState, useRef } from 'react'
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import { useGetNotificationQuery } from "../../../../store/services/notification.js";
import NotificationList from "./NotificationList.jsx"

const NotificationButton = () => {
    const [page, setPage] = useState(0)
    // const [notifications, setNotifications] = useState([]);

    const { data } = useGetNotificationQuery({
        recieverId: localStorage.getItem('userId'),
        page: page,
        quantity: 100
    })

    const ref = useRef(null)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)


    // useEffect(() => {
    //     if (isSuccess && data?.content) {
    //         const uniqueNotifications = data.content.filter(newNotification => (
    //             !notifications.some(existingNotification => existingNotification.id === newNotification.id)
    //         ));
    //         if (uniqueNotifications.length > 0) {
    //             setNotifications(prevNotifications => [...prevNotifications, ...data.content]);
    //         }
    //     }
    // }, [isSuccess, data, notifications]);


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

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };


    return (
        <>
            <button className={messengerButtonClasses} onClick={handleClickInside}>
                {isNotificationsOpen ? <RiNotification2Fill /> : <RiNotification2Line />}
            </button>
            {isNotificationsOpen && data &&
                <div ref={ref}>
                    <NotificationList data={data?.content} fetchMoreData={fetchMoreData} hasNext={data?.hasNext} page={false} />
                </div>
            }
        </>
    )
}

export default NotificationButton