import PropTypes from "prop-types";
import { Stack, Typography, Link } from "@mui/material";
import { FriendCard } from "../../../../components/friends-page-components";
import { FriendsListWrapper } from "./FriendsList.styled";

const FriendsList = ({ variant, users, heading, link }) => {
  return (
    <FriendsListWrapper>
      <Stack direction="row" justifyContent="space-between" marginBottom="20px">
        <Typography fontSize="20px" fontWeight="700">
          {heading}
        </Typography>
        <Link href={link} underline="none">
          All
        </Link>
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap="20px">
        {users?.map(({ id, firstName, lastName, avatarUrl }) => (
          <FriendCard
            variant={variant}
            key={id}
            fullName={`${firstName} ${lastName}`}
            image={avatarUrl}
          />
        ))}
      </Stack>
    </FriendsListWrapper>
  );
};

FriendsList.propTypes = {
  variant: PropTypes.oneOf(["friends", "requests"]),
  users: PropTypes.array,
  heading: PropTypes.string,
  link: PropTypes.string,
};

FriendsList.displayName = "FriendsList";

export default FriendsList;
