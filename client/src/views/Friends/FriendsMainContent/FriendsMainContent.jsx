import { Divider } from "@mui/material";

import { FriendsList } from "../../../components/friends-page-components";
import { PATH } from "../../../utils/constants";
import {
  useAcceptFriendRequestMutation,
  useAvailableFriendRequestsQuery,
  useDeclineFriendRequestMutation,
  useGetFriendsListQuery,
} from "../../../store/services/friendService";
import { MainContentWrapper } from "./FriendsMainContent.styled";

const FriendsMainContent = () => {
  const id = localStorage.getItem("userId");
  const { data: friends, isLoading } = useGetFriendsListQuery(id);
  const { data: requests } = useAvailableFriendRequestsQuery(id);
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();

  const handleMessage = (id) => {
    console.log(`start messages with user ${id}`);
  };

  return (
    <MainContentWrapper>
      <FriendsList
        variant="requests"
        users={requests?.content}
        isLoading={isLoading}
        heading="Friend Requests"
        link={PATH.FRIENDS_REQUESTS}
        onConfirm={acceptFriendRequest}
        onDecline={declineFriendRequest}
      />
      <Divider orientation="horizontal" />
      <FriendsList
        variant="friends"
        users={friends}
        isLoading={isLoading}
        heading="All Friends"
        link={PATH.FRIENDS_ALL}
        onMessage={handleMessage}
      />
    </MainContentWrapper>
  );
};

FriendsMainContent.displayName = "FriendsMainContent";

export default FriendsMainContent;
