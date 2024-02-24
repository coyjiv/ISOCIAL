import PropTypes from "prop-types";
import { CardMedia, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { ButtonMain } from "../../buttons/index.jsx";
import { CardContentWrapper, CardWrapper } from "./FriendCard.styled.js";

const FriendCard = ({
  variant,
  fullName,
  image,
  onDelete,
  onConfirm,
  onMessage,
}) => {
  const isRequestVariant = variant === "requests";

  return (
    <CardWrapper>
      <Box width="252px" height="208px">
        <CardMedia component="img" src={image} alt={fullName} />
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
  image: PropTypes.string,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
};

FriendCard.displayName = "FriendCard";

export default FriendCard;
