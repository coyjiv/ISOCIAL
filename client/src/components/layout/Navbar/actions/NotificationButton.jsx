import {RiNotification2Fill, RiNotification2Line} from "react-icons/ri";
import {useState, useRef, useEffect} from 'react'
import {useOnClickOutside} from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import {useGetNotificationQuery} from "../../../../store/services/notification.js";
import NotificationList from "./NotificationList.jsx"
import {Scrollbars} from 'react-custom-scrollbars';

const NotificationButton = () => {
    const [page, setPage] = useState(0)
    const [notifications, setNotifications] = useState([]);

    const {data, isLoading, isSuccess} = useGetNotificationQuery({
        recieverId: localStorage.getItem('userId'),
        page: page,
        quantity: 10
    })

    console.log(data, isLoading, isSuccess)


    const ref = useRef(null)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)


    useEffect(() => {
        if (isSuccess && data?.content) {
            const uniqueNotifications = data.content.filter(newNotification => (
                !notifications.some(existingNotification => existingNotification.id === newNotification.id)
            ));
            console.log('unique', uniqueNotifications)
            if (uniqueNotifications.length > 0) {
                setNotifications(prevNotifications => [...prevNotifications, ...data.content]);
            }
        }
        console.log(notifications, 'useEffect')
    }, [isSuccess, data]);


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
            <button ref={ref} className={messengerButtonClasses} onClick={handleClickInside}>
                {isNotificationsOpen ? <RiNotification2Fill/> : <RiNotification2Line/>}
            </button>
            {isNotificationsOpen &&
                <Scrollbars style={{width: '100%', height: '100%'}}>
                    <NotificationList data={notifications} fetchMoreData={fetchMoreData} hasNext={data.hasNext}/>
                </Scrollbars>


            }
        </>
    )
}

export default NotificationButton