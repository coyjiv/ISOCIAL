import { useState } from 'react'
import PropTypes from 'prop-types'
import ChatItem from '../ChatItem'
import styles from './selectChatAside.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { ChatModal } from '../ChatModal'
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { userAvatar } from '../../../data/placeholders'

const SelectChatAside = ({ chats, input, hasMore, fetchMoreData, filteredChats, searchActive, hideCreateChat }) => {
    const selectedChat = useSelector(state => state.chat.selectedChat);
    const asideClasses = classNames({
        [styles.chatAsideWrapper]: true,
        [styles.hideForMobile]: selectedChat !== null
    })

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

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
                                chatAvatar={userAvatar({ firstName: chat?.chatName.split(' ')[0], lastName: chat?.chatName.split(' ')[1], avatarsUrl: [chat?.avatarUrl] })}
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
                                chatAvatar={userAvatar({ firstName: chat?.chatName.split(' ')[0], lastName: chat?.chatName.split(' ')[1], avatarsUrl: [chat?.avatarUrl] })}
                            />
                        ))}
                </InfiniteScroll>}
            {!hideCreateChat &&
                <>
                    <ChatModal
                        open={isOpen}
                        handleClose={handleClose}
                        modalText="Select Friend"
                    />
                    <Fab
                        onClick={handleOpen}
                        sx={{ position: "fixed", bottom: "20px", left: "20px" }}
                        color="primary"
                        aria-label="edit"
                    >
                        <EditIcon />
                    </Fab>
                </>
            }
        </aside>
    )
}



SelectChatAside.propTypes = {
    chats: PropTypes.array,
    hasMore: PropTypes.bool,
    fetchMoreData: PropTypes.func,
    input: PropTypes.node,
    searchActive: PropTypes.bool,
    filteredChats: PropTypes.array,
    hideCreateChat: PropTypes.bool
}

export default SelectChatAside