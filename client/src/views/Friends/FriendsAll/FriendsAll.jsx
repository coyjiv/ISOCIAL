import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { friends } from "../../../mock";

const FriendsAllPage = () => {
  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="friends"
        users={friends}
        heading="All Friends"
        subTitle="Friends"
        withSearch
      />
    </Stack>
  );
};

FriendsAllPage.displayName = "FriendsAll";

const FriendsAll = withLayout(FriendsAllPage);

export default FriendsAll;
