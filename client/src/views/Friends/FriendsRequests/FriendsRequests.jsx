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
      setRequests(prevData => [...new Set([...prevData, ...data.content])]);
    }
  }, [data, isSuccess]);



  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };


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
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsRequestsPage.displayName = "FriendsRequests";

const FriendsRequests = withLayout(FriendsRequestsPage);

export default FriendsRequests;
