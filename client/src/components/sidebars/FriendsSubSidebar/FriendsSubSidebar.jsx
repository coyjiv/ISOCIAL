import PropTypes from "prop-types";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userAvatar } from "../../../data/placeholders.js";

import { SubSidebarHeader } from "./SubSidebarHeader";
import { FriendsSidebarUserCard } from "../../friends-page-components";
import { SidebarSearch } from "../../index";
import { SidebarItemsList, SidebarWrapper } from "./FriendsSubSidebar.styled";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
} from "../../../store/services/friendService.js";
import { LS_KEYS } from "../../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { clearSelectedChat, setPendingChat } from "../../../store/chatSlice.js";

const FriendsSubSidebar = ({
  variant,
  friends,
  withSearch,
  heading,
  subTitle,
  fetchMoreData,
  hasNext,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  // let [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery(MQ.TABLET);
  const [hiddenUsersId, setHiddenUsersId] = useLocalStorage(
    LS_KEYS.HIDDEN_USERS,
    [],
  );

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const [removeFriend] = useRemoveFriendMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();

  if (!Array.isArray(friends)) {
    return (
      <SidebarWrapper>
        <SubSidebarHeader heading={heading} link={"/friends"} />
      </SidebarWrapper>
    );
  }

  const isSuggestions = variant === "suggestions";

  const handleChange = (value) => setSearchValue(value);

  // const handleChooseUser = (id) => {
  //   if (isMobile) {
  //     navigate(`/profile/${id}`);
  //   } else {
  //     setSearchParams({ id });
  //   }
  // };

  const handleDeclineRequest = (id) => {
    declineFriendRequest({ userId: id });
    onRemove(id);
  };

  const handleConfirmRequest = (id) => {
    acceptFriendRequest({ userId: id });
    onRemove(id);
  };

  const handleRemoveFriend = (e, id) => {
    e.stopPropagation();
    removeFriend({ friendUserId: id });
    onRemove(id);
  };

  const handleAddToFriend = (id) => {
    sendFriendRequest({ userId: id });
    onRemove(id);
  };

  const handleHideSuggestion = (id) => {
    setHiddenUsersId([...hiddenUsersId, id]);
  };

  const handleMessage = (friend) => {
    // e.stopPropagation();
    if (friend.chatId !== null) {
      dispatch(clearSelectedChat())
      navigate(`/chats/${friend.chatId}`);
    } else {
      dispatch(clearSelectedChat())
      dispatch(
        setPendingChat({
          receiverId: friend.id,
          chatName: `${friend.firstName} ${friend.lastName}`,
          avatarUrl: userAvatar(friend),
          receiverStatus: friend?.activityStatus,
          messages: [],
        }),
      );
      navigate("/chat");
    }
  };

  const searchActive = searchValue.length > 0;

  return (
    <SidebarWrapper>
      <SubSidebarHeader heading={heading} link={"/friends"}>
        {withSearch && (
          <SidebarSearch
            value={searchValue}
            placeholder={isSuggestions ? "Search users" : "Search friends"}
            marginBottom="6px"
            onChange={handleChange}
          />
        )}
      </SubSidebarHeader>
      <SidebarItemsList id="scrollableDiv">
        <Typography
          fontSize="17px"
          fontWeight="600"
          marginLeft="12px"
          marginBottom="12px"
        >{`${friends?.length ?? "0"} ${subTitle}`}</Typography>
        {searchActive ? (
          <Stack width="100%" gap="10px">
            {friends?.map(
              ({
                id,
                firstName,
                lastName,
                avatarsUrl,
                gender,
                activityStatus,
                chatId,
              }) => {
                return (
                  <FriendsSidebarUserCard
                    key={id}
                    userImage={userAvatar(
                      { avatarsUrl, gender },
                      firstName,
                      lastName,
                    )}
                    fullName={`${firstName} ${lastName}`}
                    variant={variant}
                    onConfirm={() => handleConfirmRequest(id)}
                    onDecline={() => handleDeclineRequest(id)}
                    // onClick={() => handleChooseUser(id)}
                    onRemove={(e) => handleRemoveFriend(e, id)}
                    onAddToFriends={() => handleAddToFriend(id)}
                    onHideSuggestion={() => handleHideSuggestion(id)}
                    onMessage={() =>
                      handleMessage({
                        id,
                        firstName,
                        lastName,
                        chatId,
                        avatarsUrl,
                        gender,
                        activityStatus,
                      })
                    }
                  />
                );
              },
            )}
          </Stack>
        ) : (
          <InfiniteScroll
            dataLength={friends.length}
            next={fetchMoreData}
            hasMore={hasNext}
            scrollableTarget="scrollableDiv"
          // loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
          // className={styles.infiniteWrapper}
          >
            {friends.map(
              ({
                id,
                firstName,
                lastName,
                avatarsUrl,
                gender,
                chatId,
                activityStatus,
              }) => (
                <FriendsSidebarUserCard
                  key={id}
                  userImage={userAvatar(
                    { avatarsUrl, gender },
                    firstName,
                    lastName,
                  )}
                  fullName={`${firstName} ${lastName}`}
                  variant={variant}
                  onConfirm={() => handleConfirmRequest(id)}
                  onDecline={() => handleDeclineRequest(id)}
                  // onClick={() => handleChooseUser(id)}
                  onRemove={(e) => handleRemoveFriend(e, id)}
                  onAddToFriends={() => handleAddToFriend(id)}
                  onHideSuggestion={() => handleHideSuggestion(id)}
                  onMessage={() =>
                    handleMessage({
                      id,
                      firstName,
                      lastName,
                      chatId,
                      avatarsUrl,
                      gender,
                      activityStatus,
                    })
                  }
                />
              ),
            )}
          </InfiniteScroll>
        )}
      </SidebarItemsList>
    </SidebarWrapper>
  );
};

FriendsSubSidebar.propTypes = {
  withSearch: PropTypes.bool,
  variant: PropTypes.oneOf(["friends", "requests", "suggestions"]),
  subTitle: PropTypes.string,
  heading: PropTypes.string,
  friends: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  fetchMoreData: PropTypes.func,
  hasNext: PropTypes.bool,
  onRemove: PropTypes.func,
};

FriendsSubSidebar.displayName = "FriendsSubSidebar";

export default FriendsSubSidebar;
