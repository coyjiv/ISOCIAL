import PropTypes from "prop-types";
import {Avatar, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { ButtonMain } from "../../buttons";
import { CardContentWrapper, CardWrapper } from "./FriendCard.styled.js";
import {useState} from "react";

const FriendCard = ({
    id,
  variant,
  fullName,
  images,
  onDelete,
  onConfirm,
  onAddFriend,
  onClick,
}) => {
    const [msg, setMsg] = useState('');
  const isRequestVariant = variant === "requests";

  const handleAddFriend =  async (e) => {
    e.stopPropagation();

    const data = await onAddFriend({userId: id});

    if (data.error) {
        setMsg(data?.error?.response?.data);
    } else {
        setMsg(data?.data);
    }

  };

  return (
    <CardWrapper onClick={onClick}>
      <Box width="252px" height="208px">
        <Avatar
          src={images[0]}
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
        <Typography fontSize="17px" fontWeight="600" marginBottom={!msg ? '30px' : '0'}>
          {fullName}
        </Typography>

          <Typography fontSize="14px" marginBottom={!msg ? '0' : '9px'}>
              {msg}
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
          <ButtonMain onClick={(e) => handleAddFriend(e)}>Add to friends</ButtonMain>
        )}
      </CardContentWrapper>
    </CardWrapper>
  );
};

FriendCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(["friends", "requests"]),
  fullName: PropTypes.string,
  images: PropTypes.array,
  onDelete: PropTypes.func,
    onClick: PropTypes.func,
	onConfirm: PropTypes.func,
    onAddFriend: PropTypes.func,
};

FriendCard.displayName = "FriendCard";

export default FriendCard;
