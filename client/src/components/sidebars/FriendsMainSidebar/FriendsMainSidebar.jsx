import { Divider, Stack, Typography } from "@mui/material";

import { FriendsSettingsPopover } from "./FriendsSettingsPopover";
import { FriendsSidebarItem } from "./FriendsSidebarItem";
import { sidebarItemsMap } from "./FriendsMainSidebar.utils.jsx";
import {
  SidebarHeaderWrapper,
  SidebarWrapper,
} from "./FriendsMainSidebar.styled.js";

const FriendsMainSidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarHeaderWrapper>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Typography fontSize="24px" fontWeight="600">
            Friends
          </Typography>
          <FriendsSettingsPopover />
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

FriendsMainSidebar.displayName = "FriendsMainSidebar";

export default FriendsMainSidebar;
