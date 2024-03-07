/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { SubSidebarHeader } from "./SubSidebarHeader";
import { FriendsSidebarUserCard } from "../../friends-page-components";
import { SidebarSearch } from "../../index";
import { SidebarItemsList, SidebarWrapper } from "./FriendsSubSidebar.styled";
import { useSearchParams } from "react-router-dom";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "../../../store/services/friendService.js";

const FriendsSubSidebar = ({
  variant,
  users,
  withSearch,
  heading,
  subTitle,
}) => {
  const [searchValue, setSearchValue] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();

  if (!Array.isArray(users)) {
    return (
      <SidebarWrapper>
        <SubSidebarHeader heading={heading} link={"/friends"} />
      </SidebarWrapper>
    );
  }

  const filteredUsers = users?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const handleChange = (value) => setSearchValue(value);
  const handleChooseUser = (id) => setSearchParams({ id });
  const handleDeclineRequest = (e, id) => {
    e.stopPropagation();
    declineFriendRequest({ userId: id });
  };

  const handleConfirmRequest = (e, id) => {
    e.stopPropagation();
    acceptFriendRequest({ userId: id });
  };

  return (
    <SidebarWrapper>
      <SubSidebarHeader heading={heading} link={"/friends"}>
        {withSearch && (
          <SidebarSearch
            value={searchValue}
            placeholder="Search friends"
            marginBottom="6px"
            onChange={handleChange}
          />
        )}
      </SubSidebarHeader>
      <SidebarItemsList>
        <Typography
          fontSize="17px"
          fontWeight="600"
          marginLeft="12px"
          marginBottom="12px"
        >{`${users?.length ?? "0"} ${subTitle}`}</Typography>
        <Stack width="100%" gap="10px">
          {filteredUsers?.map(({ id, firstName, lastName, avatarsUrl }) => (
            <FriendsSidebarUserCard
              key={id}
              userImage={avatarsUrl}
              fullName={`${firstName} ${lastName}`}
              variant={variant}
              onConfirm={(e) => handleConfirmRequest(e, id)}
              onDelete={(e) => handleDeclineRequest(e, id)}
              onClick={() => handleChooseUser(id)}
            />
          ))}
        </Stack>
      </SidebarItemsList>
    </SidebarWrapper>
  );
};

FriendsSubSidebar.propTypes = {
  withSearch: PropTypes.bool,
  variant: PropTypes.oneOf(["friends", "requests"]),
  subTitle: PropTypes.string,
  heading: PropTypes.string,
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

FriendsSubSidebar.displayName = "FriendsSubSidebar";

export default FriendsSubSidebar;
