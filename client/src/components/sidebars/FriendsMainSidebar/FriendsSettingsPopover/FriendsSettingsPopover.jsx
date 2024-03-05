import { ActionIconButton } from "../../../index.js";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Popover } from "@mui/material";
import { PopoverContent } from "./PopoverContent";

const FriendsSettingsPopover = () => {
  const [anchorEl, setAnchorEl] = useState();
  const id = open ? "simple-popover" : undefined;

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <ActionIconButton
        aria-describedby={id}
        icon="settings"
        variant="iconWithBg"
        onClick={handleClick}
      />
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        sx={{ top: "2px", left: "-8px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <PopoverContent />
      </Popover>
    </Box>
  );
};

FriendsSettingsPopover.displayName = "FriendsSettingsPopover";

export default FriendsSettingsPopover;
