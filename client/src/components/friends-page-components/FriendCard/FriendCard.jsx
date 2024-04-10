import PropTypes from "prop-types";
import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ButtonMain } from "../../buttons";
import {
  CardContentWrapper,
  CardWrapper,
  CardAvatarWrapper,
} from "./FriendCard.styled.js";
import { useState } from "react";
import { userAvatar } from "../../../data/placeholders.js";
import CardActionsPopover from "../FriendsSidebarUserCard/CardActionsPopover/CardActionsPopover.jsx";
import { setPendingChat } from "../../../store/chatSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const FriendCard = ({
  id,
  variant,
  fullName,
  images,
  onDelete,
  onConfirm,
  onAddFriend,
  onDontShowClick,
  onClick,
  additionalInfo,
  friend,
}) => {
  const theme = useTheme();
  const [msg, setMsg] = useState("");
  const isRequestVariant = variant === "requests";
  const [isRequesting, setIsRequesting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.stopPropagation();

    if (!isRequesting) {
      const data = await onAddFriend({ userId: id });
      if (data.error) {
        setIsRequesting(false);
        setMsg(data?.error?.response?.data);
      } else {
        setIsRequesting(true);
        setMsg(data?.data);
      }
    } else {
      const data = await onAddFriend({ userId: id });
      if (data.error) {
        setMsg(data?.error?.response?.data);
        setIsRequesting(false);
      } else {
        setIsRequesting(true);
        setMsg(data?.data);
      }
      setMsg("");
    }
    onDelete(e, id);
  };

  const goToMessageStep = (friend) => {
    if (friend.chatId !== null) {
      navigate(`/chats/${friend.chatId}`);
    } else {
      dispatch(
        setPendingChat({
          receiverId: friend.id,
          chatName: `${friend.firstName} ${friend.lastName}`,
          avatarUrl: userAvatar(friend),
          receiverStatus: friend?.status,
          messages: [],
        }),
      );
      navigate("/chat");
    }
  };

  if (variant === "horizontal") {
    return (
      <Stack
        sx={{
          cursor: "pointer",
          padding: "16px",
          height: "fit-content",
          border: "1px solid",
          borderColor: theme.palette.grey[100],
          borderRadius: "8px",
        }}
        direction="row"
        spacing={2}
        alignItems="center"
        onClick={onClick}
      >
        <Avatar
          src={userAvatar(
            {
              avatarsUrl: images,
              firstName: fullName.split(" ")[0],
              lastName: fullName.split(" ")[1],
            },
            fullName.split(" ")[0],
            fullName.split(" ")[1],
          )}
          alt={fullName}
          variant="rounded"
          sx={{
            width: "80px",
            height: "80px",
            fontSize: "60px",
          }}
        />
        <Stack>
          <Typography fontSize="17px" fontWeight="600">
            {fullName}
          </Typography>
          <Typography fontSize="13px" fontWeight="400">
            {additionalInfo}
          </Typography>
        </Stack>
        <CardActionsPopover
          name={fullName}
          onRemove={onDelete}
          onMessage={(e) => { e.stopPropagation(); goToMessageStep(friend) }}
          boxProps={{ style: { marginLeft: "auto" } }}
        />
      </Stack>
    );
  }

  return (
    <CardWrapper onClick={onClick}>
      <CardAvatarWrapper>
        <Avatar
          src={userAvatar(
            { avatarsUrl: images },
            fullName.split(" ")[0],
            fullName.split(" ")[1],
          )}
          alt={fullName}
          variant="square"
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "60px",
          }}
        />
      </CardAvatarWrapper>
      <CardContentWrapper>
        <Typography
          fontSize="20px"
          fontWeight="600"
          sx={{
            fontSize: { xs: "18px", sm: "20px" },
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginBottom: { xs: "15px", sm: !msg ? "30px" : 0 },
          }}
          marginBottom={!msg ? "30px" : "0"}
        >
          {fullName}
        </Typography>

        <Typography fontSize="14px" marginBottom={!msg ? "0" : "9px"}>
          {msg}
        </Typography>
        {isRequestVariant && (
          <Stack gap="8px">
            <ButtonMain onClick={onConfirm}>Confirm</ButtonMain>
            <ButtonMain color="grey" onClick={(e) => onDelete(e, id)}>
              Delete
            </ButtonMain>
          </Stack>
        )}
        {!isRequestVariant && (
          <Stack gap="8px">
            <ButtonMain
              color={isRequesting ? "grey" : "blue"}
              onClick={(e) => handleClick(e)}
            >
              {isRequesting ? "Cancel request" : "Add to friends"}
            </ButtonMain>
            <ButtonMain color="grey" onClick={(e) => onDontShowClick(e, id)}>
              Don&apos;t Show
            </ButtonMain>
          </Stack>
        )}
      </CardContentWrapper>
    </CardWrapper>
  );
};

FriendCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf([
    "friends",
    "requests",
    "recommendations",
    "horizontal",
  ]),
  fullName: PropTypes.string,
  images: PropTypes.array,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onConfirm: PropTypes.func,
  onDontShowClick: PropTypes.func,
  onAddFriend: PropTypes.func,
  additionalInfo: PropTypes.string,
  friend: PropTypes.object,
};

FriendCard.displayName = "FriendCard";

export default FriendCard;
