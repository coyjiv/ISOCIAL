import styles from './Notification.module.scss'
import NotificationList from "../../components/layout/Navbar/actions/NotificationList.jsx";
import {useEffect, useState} from "react";
import {useGetNotificationQuery} from "../../store/services/notification.js";

const Notification = () => {
    const [page, setPage] = useState(0)
    const [notifications, setNotifications] = useState([]);


    const {data, isLoading, isSuccess} = useGetNotificationQuery({
        recieverId: localStorage.getItem('userId'),
        page: page,
        quantity: 15
    })


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

    const fetchMoreData = () => {
        console.log('fetchPage', page)
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className={styles.notificationWrapper}>
            <div className={styles.notificationContainer}>
                <NotificationList data={notifications}
                                  fetchMoreData={fetchMoreData}
                                  hasMore={data.hasMore}></NotificationList>

            </div>
        </div>
    )
}

export default Notification