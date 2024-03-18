import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'

import { FriendsSubSidebar } from '../../../components/sidebars'
import { FriendsUserProfileSection } from '../FriendsUserProfileSection'
import {
  useGetRecommendationsQuery
} from '../../../store/services/friendService'

import { withLayout } from '../../../hooks/withLayout'

const FriendsSuggestionsPage = () => {

  const [page, setPage] = useState(0)
  const { data, isLoading, isSuccess } = useGetRecommendationsQuery(page)
  const [suggestions, setSuggestions] = useState([])


  useEffect(() => {
    if (isSuccess && data?.content) {
      setSuggestions(prevData => [...new Set([...prevData, ...data.content])]);
    }
  }, [data, isSuccess]);

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };


  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="suggestions"
        users={suggestions}
        heading="Suggestions"
        subTitle="People you might know"
        withSearch
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        hasNext={data?.hasNext}
      />
      <FriendsUserProfileSection />
    </Stack>
  )
}

FriendsSuggestionsPage.displayName = 'FriendsSuggestions'

const FriendsSuggestions = withLayout(FriendsSuggestionsPage)

export default FriendsSuggestions
