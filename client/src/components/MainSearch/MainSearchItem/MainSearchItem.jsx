import PropTypes from "prop-types";
import { SearchItemWrapper } from "./MainSearchItem.styled";
import { ActionIconButton } from "../../index";
import { Stack, Avatar, Typography, useTheme } from "@mui/material";

const MainSearchItem = ({ variant, fullName, avatarUrl, onClick }) => {
  const { palette } = useTheme();

  return (
    <SearchItemWrapper onClick={onClick}>
      {variant === "search" && !avatarUrl && (
        <ActionIconButton
          bg={palette.background.greyHover}
          icon="search"
          withHover={false}
        />
      )}
      {variant === "history" && (
        <ActionIconButton
          bg={palette.background.greyHover}
          icon="clock"
          withHover={false}
        />
      )}

      {variant === "search" && avatarUrl && (
        <Avatar src={avatarUrl} alt={fullName} sx={{ width: 36, height: 36 }} />
      )}
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Typography>{fullName}</Typography>
        {variant === "history" && <ActionIconButton icon="close" size="12" />}
      </Stack>
    </SearchItemWrapper>
  );
};

MainSearchItem.propTypes = {
  variant: PropTypes.oneOf(["history", "search"]),
  fullName: PropTypes.string,
  avatarUrl: PropTypes.string,
  onClick: PropTypes.func,
};

MainSearchItem.displayName = "MainSearchItem";

export default MainSearchItem;
