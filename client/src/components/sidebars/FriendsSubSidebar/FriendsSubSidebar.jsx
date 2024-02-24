import PropTypes from "prop-types";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { PATH } from "../../../utils/constants";
import { SubSidebarHeader } from "./SubSidebarHeader";
import { FriendsSidebarUserCard } from "../../friends-page-components";
import { SidebarSearch } from "../../index";
import { SidebarItemsList, SidebarWrapper } from "./FriendsSubSidebar.styled";

const FriendsSubSidebar = ({
  variant,
  users,
  withSearch,
  heading,
  subTitle,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value) => {
    setSearchValue(value);
  };

  const filteredUsers = users?.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

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
  users: PropTypes.array,
};

FriendsSubSidebar.displayName = "FriendsSubSidebar";

export default FriendsSubSidebar;
