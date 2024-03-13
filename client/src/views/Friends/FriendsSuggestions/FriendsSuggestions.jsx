import { Stack } from '@mui/material'
import { useMediaQuery } from 'usehooks-ts'

import { FriendsSubSidebar } from '../../../components/sidebars'
import { FriendsUserProfileSection } from '../FriendsUserProfileSection'
import {
  useAvailableFriendRequestsQuery,
  useGetFriendsListQuery,
} from '../../../store/services/friendService'
import { useGetUsersQuery } from '../../../store/services/usersService'
import { useGetSuggestions } from '../../../hooks'
import { withLayout } from '../../../hooks/withLayout'
import { MQ } from '../../../utils/constants'

const FriendsSuggestionsPage = () => {
  const userId = localStorage.getItem('userId')
  const { data: friends, isLoading } = useGetFriendsListQuery(userId)
  const { data: users } = useGetUsersQuery()
  const { data: requests } = useAvailableFriendRequestsQuery()

  const suggestions = useGetSuggestions(userId, users, requests, friends)
  const isMatch = useMediaQuery(MQ.TABLET)

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
      {!isMatch && <FriendsUserProfileSection />}
    </Stack>
  )
}

FriendsSuggestionsPage.displayName = 'FriendsSuggestions'

const FriendsSuggestions = withLayout(FriendsSuggestionsPage)

export default FriendsSuggestions
