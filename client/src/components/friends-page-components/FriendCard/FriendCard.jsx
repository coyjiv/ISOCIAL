import PropTypes from "prop-types";
import { Avatar, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import fallbackAvatar from "../../../assets/fallback/Ava.jpg";

import { ButtonMain } from "../../buttons";
import { CardContentWrapper, CardWrapper } from "./FriendCard.styled.js";

const FriendCard = ({
  variant,
  fullName,
  images,
  onDelete,
  onConfirm,
  onMessage,
}) => {
  const isRequestVariant = variant === "requests";

  return (
    <CardWrapper>
      <Box width="252px" height="208px">
        <Avatar
          src={images[0] ?? fallbackAvatar}
          alt={fullName}
          variant="square"
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "60px",
          }}
        />
      </Box>
      <CardContentWrapper>
        <Typography fontSize="17px" fontWeight="600" marginBottom="15px">
          {fullName}
        </Typography>
        {isRequestVariant && (
          <Stack gap="8px">
            <ButtonMain onClick={onConfirm}>Confirm</ButtonMain>
            <ButtonMain color="grey" onClick={onDelete}>
              Delete
            </ButtonMain>
          </Stack>
        )}
        {!isRequestVariant && (
          <ButtonMain onClick={onMessage}>Message</ButtonMain>
        )}
      </CardContentWrapper>
    </CardWrapper>
  );
};

FriendCard.propTypes = {
  variant: PropTypes.oneOf(["friends", "requests"]),
  fullName: PropTypes.string,
  images: PropTypes.array,
  onDelete: PropTypes.func,
	onConfirm: PropTypes.func,
	onMessage: PropTypes.func,
};

FriendCard.displayName = "FriendCard";

export default FriendCard;
