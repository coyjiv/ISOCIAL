import { useState, useEffect } from "react"
import { useGetFriendsListQuery } from "../../../../store/services/friendService"
import PropTypes from 'prop-types'
import { useGetCurrentUserId } from "../../../../hooks"
import { FriendCardSkeleton } from "../../../../components/friends-page-components/FriendCard/FriendCardSkeleton"
import { FriendCard } from "../../../../components/friends-page-components"
import InfiniteScroll from "react-infinite-scroll-component"
import styles from './friendTabs.module.scss'
import { Stack } from "@mui/material"

const AllFriends = () => {
    const userId = useGetCurrentUserId()

    const [page, setPage] = useState(0)
    const { data, isSuccess } = useGetFriendsListQuery({ id: userId, page: page })

    const [friends, setFriends] = useState([])


    useEffect(() => {
        if (isSuccess && data?.content) {
            setFriends(prevData => {
                // Create a new map to ensure uniqueness based on the item's id.
                const dataMap = new Map();

                // Fill the map with the previous data.
                prevData.forEach(item => dataMap.set(item.id, item));

                // Add new items to the map, preventing duplicates.
                data.content.forEach(item => {
                    if (!dataMap.has(item.id)) {
                        dataMap.set(item.id, item);
                    }
                });

                // Return a new array created from the map's values.
                return Array.from(dataMap.values());
            });
        }
    }, [data, isSuccess]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    // const onDelete = (id) => {
    //     setFriends(prevData => {
    //         return prevData.filter(item => item.id !== id)
    //     })
    // }
    if (!data) {
        return <Stack marginTop={3} marginX={1} padding={1} marginBottom={1} direction='row' flexWrap='wrap' justifyContent='space-between' rowGap={2}>
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />
            <FriendCardSkeleton variant='horizontal' />

        </Stack>
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={friends.length}
                next={fetchMoreData}
                hasMore={data?.hasNext}
                loader={<div style={{ display: 'flex', width: '100%' }}><FriendCardSkeleton variant='horizontal' /></div>}
                className={styles.infiniteWrapper}
            >
                {friends?.map(({ id, firstName, lastName, avatarsUrl }) => (
                    <FriendCard
                        variant={'horizontal'}
                        key={id}
                        id={id}
                        fullName={`${firstName} ${lastName}`}
                        images={avatarsUrl}
                    // onConfirm={(e) => { onConfirm(e, id); onDelete(id) }}
                    // onDelete={(...args) => { onDecline(...args); onDelete(id) }}
                    // onAddFriend={(...args) => { onAddFriend(...args); onDelete(id) }}
                    // onClick={() => handleShowUser(id)}
                    // onDontShowClick={(...args) => { onDontShowClick(...args); onDelete(id) }}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
}

AllFriends.propTypes = {
    id: PropTypes.number
}

export default AllFriends