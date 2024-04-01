import InfiniteScroll from "react-infinite-scroll-component";
import styles from './notificationList.module.scss'
import { PostSkeleton } from "../../../../views/Profile/skeletons/PostSkeleton.jsx";
import NotificationItem from "./NotificationItem.jsx";
import Link from '../../../Link'
import PropTypes from 'prop-types'

const NotificationList = (props) => {

    const { data, fetchMoreData, hasNext, page } = props

    console.log(data);


    return (
        <div id="scrollableDiv"
            className={styles.notificationContainer}>
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
                loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
            >
                <ul className={styles.notificationList}>
                    {
                        data.map(notification =>
                            <NotificationItem key={notification.id}
                                creationDate={notification.creationDate}
                                eventType={notification.eventType}
                                senderAvatar={notification.senderAvatar}
                                senderName={notification.senderName}
                                page={page}
                                postId={notification?.entityId}
                            />
                        )
                    }
                </ul>
            </InfiniteScroll>
        </div>
    )
}

NotificationList.propTypes = {
    data: PropTypes.array.isRequired,
    fetchMoreData: PropTypes.func.isRequired,
    hasNext: PropTypes.bool.isRequired,
    page: PropTypes.bool.isRequired
}

export default NotificationList