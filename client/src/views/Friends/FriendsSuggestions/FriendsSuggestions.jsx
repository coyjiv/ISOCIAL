import { Stack } from '@mui/material'
import { FriendsSubSidebar } from '../../../components/sidebars/index.js'
import { FriendsUserProfileSection } from '../FriendsUserProfileSection/index.js'
import {
  useAvailableFriendRequestsQuery,
  useGetFriendsListQuery,
} from '../../../store/services/friendService.js'
import { useGetUsersQuery } from '../../../store/services/usersService.js'
import { useGetSuggestions } from '../../../hooks/index'
import { withLayout } from '../../../hooks/withLayout'

const FriendsSuggestionsPage = () => {
  const userId = localStorage.getItem('userId')
  const { data: friends, isLoading } = useGetFriendsListQuery(userId)
  const { data: users } = useGetUsersQuery()
  const { data: requests } = useAvailableFriendRequestsQuery()

  const suggestions = useGetSuggestions(userId, users, requests, friends)
		
  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="suggestions"
        users={suggestions}
        heading="Suggestions"
        subTitle="People you might know"
        withSearch
        isLoading={isLoading}
      />
      <FriendsUserProfileSection />
    </Stack>
  )
}

FriendsSuggestionsPage.displayName = 'FriendsSuggestions'

const FriendsSuggestions = withLayout(FriendsSuggestionsPage)

export default FriendsSuggestions
