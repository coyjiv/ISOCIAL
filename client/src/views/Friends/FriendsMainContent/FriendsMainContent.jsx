import { Divider } from "@mui/material";

import { FriendsList } from "./FriendsList";
import { PATH } from "../../../utils/constants";
import { friends } from "../../../mock";
import { MainContentWrapper } from "./FriendsMainContent.styled";

const FriendsMainContent = () => {
  return (
    <MainContentWrapper>
      <FriendsList
        variant="requests"
        users={friends}
        heading="Friend Requests"
        link={PATH.FRIENDS_REQUESTS}
      />
      <Divider orientation="horizontal" />
      <FriendsList
        variant="friends"
        users={friends}
        heading="All Friends"
        link="https://google.com"
      />
    </MainContentWrapper>
  );
};

FriendsMainContent.displayName = "FriendsMainContent";

export default FriendsMainContent;
