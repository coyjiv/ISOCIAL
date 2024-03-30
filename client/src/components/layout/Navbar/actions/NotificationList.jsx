import InfiniteScroll from "react-infinite-scroll-component";
import styles from './notificationList.module.scss'
import {PostSkeleton} from "../../../../views/Profile/skeletons/PostSkeleton.jsx";
import NotificationItem from "./NotificationItem.jsx";
import {useState, useEffect} from "react";
import Link from '../../../Link'

const NotificationList = (props) => {

    const {data, fetchMoreData, hasNext} = props

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div id="scrollableDiv"
             className={`${styles.notificationContainer} ${isVisible ? `${styles.visibility}` : ''}`}>
            <div className={styles.titles}>
                <h3 className={styles.notificationTitle}>Notifications</h3>
                <p><Link to={`/notification/`}>View All</Link></p>
            </div>
            {data.length === 0 && <div className={styles.noNotification}>No notification yet</div>}
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={hasNext}
                scrollableTarget="scrollableDiv"
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