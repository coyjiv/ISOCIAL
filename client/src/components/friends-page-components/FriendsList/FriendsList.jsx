import PropTypes from "prop-types";
import { useState } from "react";
import {
  Stack,
  Typography,
  Link,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";

import { FriendCard } from "../index";
import { FriendCardSkeleton } from "../FriendCard/FriendCardSkeleton";
import { ExpandedWrapper, FriendsListWrapper } from "./FriendsList.styled.js";

const FriendsList = ({
  variant,
  users,
  heading,
  link,
  isLoading,
  onDecline,
  onConfirm,
  onMessage,
}) => {
  const range = [...Array(5).keys()];
  const isUsers = users?.length > 0;
  const { breakpoints } = useTheme();
  const isMatches = useMediaQuery(breakpoints.up(1200));

  const isShowButton = users?.length < 4 && isMatches;

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const filteredUsers = users?.slice(0, 10);

  if (isLoading) {
    return (
      <FriendsListWrapper>
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography fontSize="20px" fontWeight="700">
            {heading}
          </Typography>
          <Link href={link} underline="none">
            All
          </Link>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap="20px">
          {range.map((item) => (
            <FriendCardSkeleton key={item} />
          ))}
        </Stack>
      </FriendsListWrapper>
    );
  }

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
      <ExpandedWrapper active={expanded ? "expanded" : undefined}>
        {isUsers ? (
          filteredUsers?.map(({ id, firstName, lastName, avatarsUrl }) => (
            <FriendCard
              variant={variant}
              key={id}
              fullName={`${firstName} ${lastName}`}
              images={avatarsUrl}
              onConfirm={() => onConfirm({ friendId: id })}
              onDelete={() => onDecline({ friendId: id })}
              onMessage={() => onMessage(id)}
            />
          ))
        ) : (
          <Typography>No one has added a friend yet</Typography>
        )}
      </ExpandedWrapper>
      {!expanded && !isShowButton && (
        <Button
          variant="text"
          endIcon={<IoMdArrowDropdown />}
          onClick={handleExpand}
          sx={{ marginTop: "12px" }}
        >
          See more
        </Button>
      )}
    </FriendsListWrapper>
  );
};

FriendsList.propTypes = {
  variant: PropTypes.oneOf(["friends", "requests"]),
  users: PropTypes.array,
  heading: PropTypes.string,
  link: PropTypes.string,
  isLoading: PropTypes.bool,
  onDecline: PropTypes.func,
  onConfirm: PropTypes.func,
  onMessage: PropTypes.func,
};

FriendsList.displayName = "FriendsList";

export default FriendsList;
