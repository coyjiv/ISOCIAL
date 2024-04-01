import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { FriendsUserProfileSection } from "../FriendsUserProfileSection";
import { useAvailableFriendRequestsQuery } from "../../../store/services/friendService.js";

const FriendsRequestsPage = () => {
  const [page, setPage] = useState(0)
  const { data, isLoading, isSuccess } = useAvailableFriendRequestsQuery(page);

  const [requests, setRequests] = useState([])

  useEffect(() => {
    if (isSuccess && data?.content) {
      setRequests(prevData => {
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
    setRequests(prevData => {
      return prevData.filter(item => item.id !== id)
    })
  }


  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="requests"
        users={requests}
        heading="Friend Requests"
        subTitle="Friend Requests"
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        hasNext={data?.hasNext}
        onRemove={onRemove}
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsRequestsPage.displayName = "FriendsRequests";

const FriendsRequests = withLayout(FriendsRequestsPage);

export default FriendsRequests;
