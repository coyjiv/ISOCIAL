import PropTypes from "prop-types";
import { Stack, Typography, useTheme } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { IconWrapper, ItemWrapper } from "./FriendsSidebarItem.styled";

const FriendsSidebarItem = ({ icon, title, to }) => {
  const { palette } = useTheme();
  const { pathname } = useLocation();

  const isActive = pathname === to;

  return (
    <Link to={to}>
      <ItemWrapper selected={isActive}>
        <Stack alignItems="center" direction="row" gap="10px">
          <IconWrapper selected={isActive}>{icon}</IconWrapper>
          <Typography fontSize="17px">{title}</Typography>
        </Stack>
        {!isActive && (
          <IoIosArrowForward size="26" color={palette.background?.selectIcon} />
        )}
      </ItemWrapper>
    </Link>
  );
};

FriendsSidebarItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  to: PropTypes.string,
};

FriendsSidebarItem.displayName = "FriendsSidebarItem";

export default FriendsSidebarItem;
