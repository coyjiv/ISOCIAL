import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { FriendsUserProfileSection } from "../FriendsUserProfileSection";
import { useAvailableFriendRequestsQuery } from "../../../store/services/friendService.js";

const FriendsRequestsPage = () => {
  const { data: requests, isLoading } = useAvailableFriendRequestsQuery();

  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="requests"
        users={requests?.content}
        heading="Friend Requests"
        subTitle="Friend Requests"
        isLoading={isLoading}
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsRequestsPage.displayName = "FriendsRequests";

const FriendsRequests = withLayout(FriendsRequestsPage);

export default FriendsRequests;
