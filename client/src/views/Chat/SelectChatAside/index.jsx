import PropTypes from 'prop-types'
import ChatItem from '../ChatItem'
import styles from './selectChatAside.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const SelectChatAside = ({ chats, input, hasMore, fetchMoreData, filteredChats, searchActive }) => {
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const asideClasses = classNames({
        [styles.chatAsideWrapper]: true,
        [styles.hideForMobile]: selectedChat !== null
    })

    return (
        <aside className={asideClasses}>
            <div className={styles.chatAsideHeader}>
                {input}
            </div>
            {searchActive ?
                <div className={styles.chatList}>
                    {filteredChats &&
                        filteredChats?.map((chat) => (
                            <ChatItem
                                key={chat?.id}
                                chatId={chat?.id}
                                chatName={chat?.chatName}
                                lastMessage={chat?.lastMessage}
                                lastMessageDate={chat?.lastMessageDate}
                                chatAvatar={chat?.avatarUrl}
                            />
                        ))}
                </div>
                : <InfiniteScroll
                    dataLength={chats.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<div style={{ display: 'flex', width: '100%' }}>Loading...</div>}
                    className={styles.chatList}
                >
                    {chats &&
                        chats?.map((chat) => (
                            <ChatItem
                                key={chat?.id}
                                chatId={chat?.id}
                                chatName={chat?.chatName}
                                lastMessage={chat?.lastMessage}
                                lastMessageDate={chat?.lastMessageDate}
                                chatAvatar={chat?.avatarUrl}
                            />
                        ))}
                </InfiniteScroll>}
        </aside>
    )
}



SelectChatAside.propTypes = {
    chats: PropTypes.array,
    hasMore: PropTypes.bool,
    fetchMoreData: PropTypes.func,
    input: PropTypes.node,
    searchActive: PropTypes.bool,
    filteredChats: PropTypes.array
}

export default SelectChatAside