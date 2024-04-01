import styles from './Notification.module.scss'
import { useEffect, useState } from "react";
import { useGetNotificationQuery } from "../../store/services/notification.js";
import { withLayout } from "../../hooks/withLayout.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostSkeleton } from "../Profile/skeletons/PostSkeleton.jsx";
import NotificationItem from "../../components/layout/Navbar/actions/NotificationItem.jsx";

const Notification = () => {
    const [page, setPage] = useState(0)
    const [notifications, setNotifications] = useState([]);


    const { data, isSuccess } = useGetNotificationQuery({
        recieverId: localStorage.getItem('userId'),
        page: page,
        quantity: 15
    })


    useEffect(() => {
        if (isSuccess && data?.content) {
            const uniqueNotifications = data.content.filter(newNotification => (
                !notifications.some(existingNotification => existingNotification.id === newNotification.id)
            ));
            if (uniqueNotifications.length > 0) {
                setNotifications(prevNotifications => [...prevNotifications, ...data.content]);
            }
        }
    }, [isSuccess, data, notifications]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className={styles.notificationWrapper}>
            <div
                className={`${styles.notificationContainer}`}>
                <div className={styles.titles}>
                    <h3 className={styles.notificationTitle}>Notifications</h3>
                </div>
                {notifications.length === 0 ? <h2>No notifications for now</h2> : <InfiniteScroll
                    dataLength={notifications.length}
                    next={fetchMoreData}
                    hasMore={data?.hasNext}
                    className={styles.notificationList}
                    loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
                >
                    {
                        notifications.map(notification =>
                            <NotificationItem key={notification.id}
                                creationDate={notification.creationDate}
                                eventType={notification.eventType}
                                senderAvatar={notification.senderAvatar}
                                senderName={notification.senderName}
                                page={true}
                            />
                        )
                    }
                </InfiniteScroll>}
            </div>
        </div>
    )
}
const NotificationPage = withLayout(Notification)
export default NotificationPage
