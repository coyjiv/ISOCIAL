import PropTypes from 'prop-types'
import { useState } from 'react'
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'
import { Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userAvatar } from '../../../data/placeholders.js'

import { SubSidebarHeader } from './SubSidebarHeader'
import { FriendsSidebarUserCard } from '../../friends-page-components'
import { SidebarSearch } from '../../index'
import { SidebarItemsList, SidebarWrapper } from './FriendsSubSidebar.styled'
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
} from '../../../store/services/friendService.js'
import { LS_KEYS, MQ } from '../../../utils/constants'
import InfiniteScroll from 'react-infinite-scroll-component'

const FriendsSubSidebar = ({
  variant,
  users,
  withSearch,
  heading,
  subTitle,
  fetchMoreData,
  hasNext
}) => {
  const [searchValue, setSearchValue] = useState('')
  let [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(MQ.TABLET)
  const [hiddenUsersId, setHiddenUsersId] = useLocalStorage(
    LS_KEYS.HIDDEN_USERS,
    [],
  )

  const [acceptFriendRequest] = useAcceptFriendRequestMutation()
  const [declineFriendRequest] = useDeclineFriendRequestMutation()
  const [removeFriend] = useRemoveFriendMutation()
  const [sendFriendRequest] = useSendFriendRequestMutation()

  if (!Array.isArray(users)) {
    return (
      <SidebarWrapper>
        <SubSidebarHeader heading={heading} link={'/friends'} />
      </SidebarWrapper>
    )
  }

  const isSuggestions = variant === 'suggestions'

  const filteredUsers = users?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase())
    )
  })

  const handleChange = (value) => setSearchValue(value)

  const handleChooseUser = (id) => {
    isMobile ? navigate(`/profile/${id}`) : setSearchParams({ id })
  }

  const handleDeclineRequest = (id) => {
    declineFriendRequest({ userId: id })
  }

  const handleConfirmRequest = (id) => {
    acceptFriendRequest({ userId: id })
  }

  const handleRemoveFriend = (e, id) => {
    e.stopPropagation()
    removeFriend({ friendUserId: id })
  }

  const handleAddToFriend = (id) => {
    sendFriendRequest({ userId: id })
  }

  const handleHideSuggestion = (id) => {
    console.log(id)
    setHiddenUsersId([...hiddenUsersId, id])
  }

  const handleMessage = (e, id) => {
    e.stopPropagation()
    console.log(`start messages with user ${id}`)
  }

  const searchActive = searchValue.length > 0

  return (
    <SidebarWrapper>
      <SubSidebarHeader heading={heading} link={'/friends'}>
        {withSearch && (
          <SidebarSearch
            value={searchValue}
            placeholder={isSuggestions ? 'Search users' : 'Search friends'}
            marginBottom="6px"
            onChange={handleChange}
          />
        )}
      </SubSidebarHeader>
      <SidebarItemsList id='scrollableDiv'>
        <Typography
          fontSize="17px"
          fontWeight="600"
          marginLeft="12px"
          marginBottom="12px"
        >{`${users?.length ?? '0'} ${subTitle}`}</Typography>
        {searchActive ? <Stack width="100%" gap="10px">
          {filteredUsers?.map(({ id, firstName, lastName, avatarsUrl, gender }) => (
            <FriendsSidebarUserCard
              key={id}
              userImage={userAvatar({ avatarsUrl, gender }, firstName, lastName)}
              fullName={`${firstName} ${lastName}`}
              variant={variant}
              onConfirm={() => handleConfirmRequest(id)}
              onDecline={() => handleDeclineRequest(id)}
              onClick={() => handleChooseUser(id)}
              onRemove={(e) => handleRemoveFriend(e, id)}
              onAddToFriends={() => handleAddToFriend(id)}
              onHideSuggestion={() => handleHideSuggestion(id)}
              onMessage={(e) => handleMessage(e, id)}
            />
          ))}
        </Stack> :
          <InfiniteScroll
            dataLength={users.length}
            next={fetchMoreData}
            hasMore={hasNext}
            scrollableTarget="scrollableDiv"
          // loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
          // className={styles.infiniteWrapper}
          >
            {users.map(({ id, firstName, lastName, avatarsUrl, gender }) => (
              <FriendsSidebarUserCard
                key={id}
                userImage={userAvatar({ avatarsUrl, gender }, firstName, lastName)}
                fullName={`${firstName} ${lastName}`}
                variant={variant}
                onConfirm={() => handleConfirmRequest(id)}
                onDecline={() => handleDeclineRequest(id)}
                onClick={() => handleChooseUser(id)}
                onRemove={(e) => handleRemoveFriend(e, id)}
                onAddToFriends={() => handleAddToFriend(id)}
                onHideSuggestion={() => handleHideSuggestion(id)}
                onMessage={(e) => handleMessage(e, id)}
              />
            ))}
          </InfiniteScroll>
        }
      </SidebarItemsList>
    </SidebarWrapper>
  )
}

FriendsSubSidebar.propTypes = {
  withSearch: PropTypes.bool,
  variant: PropTypes.oneOf(['friends', 'requests', 'suggestions']),
  subTitle: PropTypes.string,
  heading: PropTypes.string,
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  fetchMoreData: PropTypes.func,
  hasNext: PropTypes.bool
}

FriendsSubSidebar.displayName = 'FriendsSubSidebar'

export default FriendsSubSidebar
