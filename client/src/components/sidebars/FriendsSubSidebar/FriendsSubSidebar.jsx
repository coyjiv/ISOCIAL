import PropTypes from "prop-types";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { PATH } from "../../../utils/constants";
import { SubSidebarHeader } from "./SubSidebarHeader";
import { FriendsSidebarUserCard } from "../../friends-page-components";
import { SidebarSearch } from "../../index";
import { SidebarItemsList, SidebarWrapper } from "./FriendsSubSidebar.styled";
import { useSearchParams } from "react-router-dom";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
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
  const [cancelFriendRequest] = useCancelFriendRequestMutation();

  if (!Array.isArray(users)) {
    return (
      <SidebarWrapper>
        <SubSidebarHeader heading={heading} link={PATH.FRIENDS} />
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
  const handleDeleteRequest = (e, id) => {
    console.log(id);
    e.stopPropagation();
    cancelFriendRequest({ userId: id });
  };
  const handleConfirmRequest = (e, id) => {
    e.stopPropagation();
    acceptFriendRequest({ userId: 2 });
  };

  return (
    <SidebarWrapper>
      <SubSidebarHeader heading={heading} link={PATH.FRIENDS}>
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
          {filteredUsers?.map(({ id, firstName, lastName, avatar }) => (
            <FriendsSidebarUserCard
              key={id}
              userImage={avatar}
              fullName={`${firstName} ${lastName}`}
              variant={variant}
              onConfirm={(e) => handleConfirmRequest(id)}
              onDelete={(e) => handleDeleteRequest(e, id)}
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
