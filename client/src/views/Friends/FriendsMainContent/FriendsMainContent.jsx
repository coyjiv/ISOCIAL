import { Divider } from '@mui/material'

import { FriendsList } from '../../../components/friends-page-components'
import {
  useAcceptFriendRequestMutation,
  useAvailableFriendRequestsQuery,
  useDeclineFriendRequestMutation,
  useGetFriendsListQuery,
  useSendFriendRequestMutation,
} from '../../../store/services/friendService'
import { useGetUsersQuery } from '../../../store/services/usersService'
import { MainContentWrapper } from './FriendsMainContent.styled'
import { useGetSuggestions } from '../../../hooks'

const FriendsMainContent = () => {
  const userId = localStorage.getItem('userId')
  const { data: friends } = useGetFriendsListQuery(userId)
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery()
  const { data: requests, isLoading: isRequestsLoading } =
    useAvailableFriendRequestsQuery()
  const [acceptFriendRequest] = useAcceptFriendRequestMutation()
  const [declineFriendRequest] = useDeclineFriendRequestMutation()
  const [sendFriendRequest] = useSendFriendRequestMutation()

  const knownUsers = useGetSuggestions(userId, users, requests, friends)

  const handleMessage = (id) => {
    console.log(`start messages with user ${id}`)
  }

  const handleConfirm = (e, id) => {
    e.stopPropagation()
    acceptFriendRequest({ userId: id })
  }

  const handleDecline = (e, id) => {
    e.stopPropagation()
    declineFriendRequest({ userId: id })
  }

  return (
		<MainContentWrapper sx={{ display: { xs: 'none', sm: 'none', md: 'block' }}}>
			<FriendsList
        variant="requests"
        users={requests?.content}
        isLoading={isRequestsLoading}
        heading="Friend Requests"
        link={'/friends/requests'}
        onConfirm={handleConfirm}
        onDecline={handleDecline}
      />
			<Divider orientation="horizontal" sx={{ margin: "12px 0" }}/>
      <FriendsList
        variant="friends"
        users={knownUsers}
        isLoading={isUsersLoading}
        heading="People you may know"
        link={'/friends'}
        onAddFriend={sendFriendRequest}
        onMessage={handleMessage}
        onDecline={handleDecline}
      />
    </MainContentWrapper>
  )
}

FriendsMainContent.displayName = 'FriendsMainContent'

export default FriendsMainContent
