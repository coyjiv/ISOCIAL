import PropTypes from "prop-types";
import { UserCardWrapper } from "./UserCard.styled.js";
import { Avatar, Stack, Typography } from "@mui/material";

import { ButtonMain } from "../buttons";
import { useSendFriendRequestMutation } from "../../store/services/friendService.js";

const UserCard = ({ id, avatarUrl, fullName, city, friendsCount }) => {
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleAddFriend = () => {
    sendFriendRequest({ userId: id });
  };

  return (
    <UserCardWrapper>
      <Stack width="100%" direction="row" alignItems="center">
        <Avatar
          src={avatarUrl}
          sx={{ width: 60, height: 60 }}
          alt={fullName}
        />
        <Stack width="100%" marginLeft="12px" flex="1">
          <Typography fontSize="17px" fontWeight="500">
            {fullName}
          </Typography>
          <Stack direction="row">
            <Typography fontSize="15px" color="text.grey">
              Lives is {city ?? "Kyiv"} · {friendsCount ?? 0} followers
            </Typography>
          </Stack>
        </Stack>
        <ButtonMain fullWidth={false} onClick={handleAddFriend}>
          Add to friends
        </ButtonMain>
      </Stack>
    </UserCardWrapper>
  );
};

UserCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatarUrl: PropTypes.string,
  fullName: PropTypes.string,
  city: PropTypes.string,
  friendsCount: PropTypes.number,
  onClick: PropTypes.func,
};

UserCard.displayName = "UserCard";

export default UserCard;
