import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { FriendsUserProfileSection } from "../FriendsUserProfileSection";
// import { friends } from "../../../mock/index.js";
import { useGetFriendsListQuery } from "../../../store/services/friendService.js";

const FriendsAllPage = () => {
  const userId = localStorage.getItem("userId");

  const { data: friends } = useGetFriendsListQuery(userId);
  console.log(friends);
  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="friends"
        users={friends}
        heading="All Friends"
        subTitle="Friends"
        withSearch
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsAllPage.displayName = "FriendsAll";

const FriendsAll = withLayout(FriendsAllPage);

export default FriendsAll;
