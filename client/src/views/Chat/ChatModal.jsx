/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogTitle,
  Avatar,
  Box,
  IconButton,
  Typography,
  Input,
} from "@mui/material";
import { useState } from "react";
import "./Chat.scss";
import PropTypes from "prop-types";
import { userAvatar } from "../../data/placeholders.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPendingChat } from "../../store/chatSlice.js";
import { useNavigate } from "react-router-dom";
import { Emoji } from "emoji-picker-react";
import { useGetUserByNameQuery } from "../../store/services/searchService.js";
import { useDebounce } from "usehooks-ts";
import { useGetFriendsListQuery } from "../../store/services/friendService.js";
import classNames from "classnames";

const ChatModal = ({ modalText, open = false, handleClose }) => {
  const [friendsPage, setFriendsPage] = useState(0);

  const { data: friends } = useGetFriendsListQuery({
    id: localStorage.getItem("userId"),
    page: friendsPage,
  });

  const navigate = useNavigate();

  const theme = useTheme();

  const dispatch = useDispatch();

  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 200);

  const {
    data: searchFriendsData,
    isSuccess,
    isFetching,
  } = useGetUserByNameQuery(
    { name: debouncedValue, page: 0 },
    { skip: debouncedValue.length === 0 },
  );

  const noFriends = !searchActive && friends && friends.content.length === 0;

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const friendsWrapperClasses = classNames({
    "friends-wrapper": true,
    mt20: !noFriends,
  });

  const backAction = () => {
    if (searchActive) {
      setSearchActive(false);
    } else {
      handleClose();
    }
  };

  const searchAction = () => {
    if (searchValue.length > 0) {
      setSearchValue("");
    } else {
      setSearchActive(true);
    }
  };
  const goToMessageStep = (friend) => {
    if (friend.chatId != null) {
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

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={fullScreen}
      scroll="paper"
      sx={{
        "& .MuiDialog-paper": {
          width: { sm: "500px" },
          textAlign: "center",
          height: { sm: "500px" },
        },
      }}
      onClose={handleClose}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "50px",
          background: theme.palette.wash,
        }}
      >
        <IconButton
          onClick={backAction}
          sx={{ position: "absolute", left: "20px" }}
        >
          <FaArrowLeft size={"18px"} />
        </IconButton>
        {searchActive ? (
          <Input
            autoFocus
            disableUnderline
            className="chatmodal-search-friends-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            sx={{ margin: "0 auto" }}
          />
        ) : (
          <Typography
            variant="p"
            sx={{
              margin: "0 auto",
              fontSize: "20px",
              fontWeight: 900,
              opacity: "0.8",
            }}
          >
            New message
          </Typography>
        )}
        <IconButton
          onClick={searchAction}
          sx={{
            display:
              searchActive && searchValue.length === 0 ? "none" : "inline-flex",
            position: "absolute",
            right: "20px",
          }}
        >
          {searchActive ? (
            <FaXmark size={"15px"} />
          ) : (
            <FaSearch size={"15px"} />
          )}
        </IconButton>
      </Box>
      {!searchActive && (
        <DialogTitle sx={{ padding: "20px" }} fontSize={20} fontWeight={900}>
          {modalText}
        </DialogTitle>
      )}

      <div className={friendsWrapperClasses}>
        {searchActive
          ? searchFriendsData &&
          searchFriendsData?.content.map((friend) => (
            <div className="modal-item-wrapper" key={friend.id}>
              <button
                className="chat-modal-button"
                onClick={() => goToMessageStep(friend)}
              >
                <Avatar src={userAvatar(friend)} alt="avatar" />
                {friend.firstName} {friend.lastName}
              </button>
            </div>
          ))
          : friends &&
          friends.content.map((friend) => (
            <div className="modal-item-wrapper" key={friend.id}>
              <button
                className="chat-modal-button"
                onClick={() => goToMessageStep(friend)}
              >
                <Avatar src={userAvatar(friend)} alt="avatar" />
                {friend.firstName} {friend.lastName}
              </button>
            </div>
          ))}
        {noFriends && (
          <div className="chat-modal-no-friends_wrapper">
            <div>
              <Emoji unified="1f613" size={64} />
              <p>You have no friends yet</p>
              <ul className="chat-modal-no-friends_wrapper_list">
                <li>Invite your friends to iSocial</li>
                <li>Send friend invites to other people</li>
                <li>Comeback later</li>
              </ul>
            </div>
          </div>
        )}

        {searchFriendsData &&
          searchFriendsData.content.length === 0 &&
          isSuccess &&
          !isFetching &&
          searchActive && (
            <div>
              <p>No results</p>
            </div>
          )}
      </div>
    </Dialog>
  );
};

ChatModal.propTypes = {
  modalText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { ChatModal };
