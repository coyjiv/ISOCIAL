import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";

import s from "./SidebarItem.module.scss";

const SidebarItem = ({ IconComponent, title, path }) => {
  const { firstName, lastName, avatarUrl } = useSelector(
    (state) => state.profile,
  );

  const isProfile = title === "user";
  const itemTitle = isProfile ? `${firstName} ${lastName}` : title;

  return (
    <Box className={s.itemWrapper}>
      {isProfile ? <Avatar src={avatarUrl} /> : IconComponent}
      <Link to={path}>
        <Typography fontSize="22px">{itemTitle}</Typography>
      </Link>
    </Box>
  );
};

SidebarItem.propTypes = {
  IconComponent: PropTypes.any,
  title: PropTypes.string,
  path: PropTypes.string,
};

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
