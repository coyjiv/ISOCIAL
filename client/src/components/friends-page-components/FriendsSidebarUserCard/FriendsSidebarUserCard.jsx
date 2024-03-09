import PropTypes from "prop-types";
import { Avatar, Stack, Typography } from "@mui/material";

import fallbackAvatar from "../../../assets/fallback/Ava.jpg";
import {
  CardContentWrapper,
  CardWrapper,
} from "./FriendsSidebarUserCard.styled.js";
import { CardActionsPopover } from "./CardActionsPopover";
import { ButtonMain } from "../../buttons";

const FriendsSidebarUserCard = ({
  variant,
  userImage,
  fullName,
  onConfirm,
  onDelete,
  onRemove,
  onMessage,
  onClick,
}) => {
  const isRequestVariant = variant === "requests";

  return (
    <CardWrapper variant={variant} onClick={onClick}>
      <Stack direction="row" gap="8px" alignItems="center">
        <Avatar
          src={userImage?.[0] ?? fallbackAvatar}
          sx={{ width: 60, height: 60 }}
        />
        <CardContentWrapper variant={variant}>
          <Typography fontSize="17px" fontWeight="500">
            {fullName}
          </Typography>

          {!isRequestVariant && (
            <CardActionsPopover
              name={fullName}
              onRemove={onRemove}
              onMessage={onMessage}
            />
          )}
          {isRequestVariant && (
            <Stack direction="row" gap="6px" width="100%">
              <ButtonMain onClick={onConfirm}>Confirm</ButtonMain>
              <ButtonMain color="grey" onClick={onDelete}>
                Delete
              </ButtonMain>
            </Stack>
          )}
        </CardContentWrapper>
      </Stack>
    </CardWrapper>
  );
};

FriendsSidebarUserCard.propTypes = {
  variant: PropTypes.oneOf(["friends", "requests"]),
  fullName: PropTypes.string,
  userImage: PropTypes.array,
  onMessage: PropTypes.func,
  onConfirm: PropTypes.func,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
};

FriendsSidebarUserCard.displayName = "FriendsSidebarUserCard";

export default FriendsSidebarUserCard;
