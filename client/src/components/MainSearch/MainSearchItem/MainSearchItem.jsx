import PropTypes from "prop-types";
import { Stack, Avatar, Typography } from "@mui/material";

import { SearchItemWrapper } from "./MainSearchItem.styled";
import { userAvatar } from "../../../data/placeholders";

const MainSearchItem = ({ fullName, avatars, onClick }) => {
  return (
    <SearchItemWrapper onClick={onClick}>
      <Avatar
        src={userAvatar({
          avatarsUrl: avatars,
          firstName: fullName.split(" ")[0],
          lastName: fullName.split(" ")[1],
        })}
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
