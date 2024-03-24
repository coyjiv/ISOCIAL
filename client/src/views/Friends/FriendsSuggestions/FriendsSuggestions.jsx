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
      setSuggestions(prevData => {
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

  const onRemove = (id) => {
    setSuggestions(prevData => {
      return prevData.filter(item => item.id !== id)
    })
  }


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
        onRemove={onRemove}
      />
      <FriendsUserProfileSection />
    </Stack>
  )
}

FriendsSuggestionsPage.displayName = 'FriendsSuggestions'

const FriendsSuggestions = withLayout(FriendsSuggestionsPage)

export default FriendsSuggestions
