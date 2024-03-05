import PropTypes from "prop-types";
import { Stack, Avatar, Typography } from "@mui/material";

import fallbackAvatar from "../../../assets/fallback/Ava.jpg";
import { SearchItemWrapper } from "./MainSearchItem.styled";

const MainSearchItem = ({ fullName, avatars, onClick }) => {
  return (
    <SearchItemWrapper onClick={onClick}>
      <Avatar
        src={avatars[0] ?? fallbackAvatar}
        alt={fullName}
        sx={{ width: 45, height: 45 }}
      />

      <Stack direction="row" width="100%" justifyContent="space-between">
        <Typography>{fullName}</Typography>
      </Stack>
    </SearchItemWrapper>
  );
};

MainSearchItem.propTypes = {
  fullName: PropTypes.string,
  avatars: PropTypes.array,
  onClick: PropTypes.func,
};

MainSearchItem.displayName = "MainSearchItem";

export default MainSearchItem;
