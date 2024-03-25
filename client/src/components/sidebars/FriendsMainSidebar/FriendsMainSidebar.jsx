import { Divider, Stack, Typography } from "@mui/material";

import { FriendsSidebarItem } from "./FriendsSidebarItem";
import { sidebarItemsMap } from "./FriendsMainSidebar.utils.jsx";
import {
  SidebarHeaderWrapper,
  SidebarWrapper,
} from "./FriendsMainSidebar.styled.js";

import PropTypes from "prop-types";

const FriendsMainSidebar = ({ hidden }) => {
  return (
    <SidebarWrapper hidden={hidden}>
      <SidebarHeaderWrapper>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Typography fontSize="24px" fontWeight="600">
            Friends
          </Typography>
        </Stack>
      </SidebarHeaderWrapper>
      <Stack gap="2px" marginTop="8px">
        {sidebarItemsMap.map((item) => (
          <FriendsSidebarItem key={item.to} {...item} />
        ))}
      </Stack>
      <Divider orientation="horizontal" sx={{ my: "8px" }} />
    </SidebarWrapper>
  );
};

FriendsMainSidebar.propTypes = {
  hidden: PropTypes.bool,
};

FriendsMainSidebar.displayName = "FriendsMainSidebar";

export default FriendsMainSidebar;
