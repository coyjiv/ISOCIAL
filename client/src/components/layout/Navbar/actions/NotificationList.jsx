import InfiniteScroll from "react-infinite-scroll-component";
import styles from './notificationList.module.scss'
import {PostSkeleton} from "../../../../views/Profile/skeletons/PostSkeleton.jsx";
import NotificationItem from "./NotificationItem.jsx";

const NotificationList = (props) => {

    const {data, fetchMoreData, hasNext} = props

    return (
        <div className={styles.notificationContainer}>
            <h3 className={styles.notificationTitle}>Notifications</h3>
            {data.length === 0 && <div className={styles.noNotification}>No notification yet</div>}
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={hasNext}
                loader={<div style={{display: 'flex', width: '100%'}}><PostSkeleton/></div>}
            >
                <ul className={styles.notificationList}>
                    {
                        data.map(notification =>
                            <NotificationItem key={notification.id}
                                              creationDate={notification.creationDate}
                                              eventType={notification.eventType}
                                              senderAvatar={notification.senderAvatar}
                                              senderName={notification.senderName}
                            />
                        )
                    }
                </ul>

            </InfiniteScroll>
        </div>
    )
}

export default NotificationList