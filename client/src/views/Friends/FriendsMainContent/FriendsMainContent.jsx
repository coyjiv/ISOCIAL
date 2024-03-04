import { Divider, Stack } from "@mui/material";

import { FriendsList } from "./FriendsList";
import { PATH } from "../../../utils/constants";
import { friends } from "../../../mock";
import { MainContentWrapper } from "./FriendsMainContent.styled";
import { useGetUsersQuery } from "../../../store/services/usersService.js";
import { UserCard } from "../../../components/index.js";

const FriendsMainContent = () => {
  const { data, isLoading } = useGetUsersQuery();
  console.log(data);
  return (
    <MainContentWrapper>
      <Stack alignItems="center" gap="15px">
        {data?.map(({ id, firstName, lastName, ...user }) => (
          <UserCard
            key={id}
            id={id}
            fullName={`${firstName} ${lastName}`}
            {...user}
          />
        ))}
      </Stack>
      <FriendsList
        variant="requests"
        users={data}
        heading="Users you may know"
        link={PATH.FRIENDS_REQUESTS}
      />
      <Divider orientation="horizontal" />
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
