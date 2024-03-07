import { Divider } from "@mui/material";

import { FriendsList } from "../../../components/friends-page-components";
import {
  useAcceptFriendRequestMutation,
  useAvailableFriendRequestsQuery,
  useDeclineFriendRequestMutation, useGetFriendsListQuery, useSendFriendRequestMutation,
} from "../../../store/services/friendService";
import { useGetUsersQuery } from "../../../store/services/usersService";
import { MainContentWrapper } from "./FriendsMainContent.styled";
import {useMemo} from "react";

const FriendsMainContent = () => {
  const userId = localStorage.getItem("userId");
  const { data: friends  } = useGetFriendsListQuery(userId);
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: requests, isLoading: isRequestsLoading } = useAvailableFriendRequestsQuery();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();


  const knownUsers = useMemo(() => {
    if (users) {
      const usersWithoutMe = users?.filter((user) => user.id !== Number(userId));
      const usersWithoutRequests = usersWithoutMe.filter((user) => !requests?.content.find((request) => request.id === user.id));
      const usersWithoutFriends = usersWithoutRequests.filter((user) => !friends?.find((friend) => friend.id === user.id))

      return usersWithoutFriends
    }
  }, [userId, users, requests?.content, friends])


  const handleMessage = (id) => {
    console.log(`start messages with user ${id}`);
  };

  const handleConfirm = (e, id) => {
    e.stopPropagation();
    acceptFriendRequest({ userId: id });
  };

  const handleDecline = (e, id) => {
    e.stopPropagation();
    declineFriendRequest({ userId: id });
  }



  return (
    <MainContentWrapper>
      <FriendsList
        variant="requests"
        users={requests?.content}
        isLoading={isRequestsLoading}
        heading="Friend Requests"
        link={"/friends/requests"}
        onConfirm={handleConfirm}
        onDecline={handleDecline}
      />
      <Divider orientation="horizontal" />
      <FriendsList
        variant="friends"
        users={knownUsers}
        isLoading={isUsersLoading}
        heading="People you may know"
        link={"/friends/all"}
        onAddFriend={sendFriendRequest}
        onMessage={handleMessage}
      />
    </MainContentWrapper>
  );
};

FriendsMainContent.displayName = "FriendsMainContent";

export default FriendsMainContent;
