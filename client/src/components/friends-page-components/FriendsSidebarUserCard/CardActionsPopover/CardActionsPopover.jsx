import PropTypes from "prop-types";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiUserX } from "react-icons/fi";
import { useState } from "react";

import { Popover, Typography, Box } from "@mui/material";
import { ActionIconButton } from "../../../index";
import {
  PopoverContentWrapper,
  PopoverItemWrapper,
} from "./CardActionsPopover.styled";

const CardActionsPopover = ({ name, onMessage, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState();
  const id = open ? "simple-popover" : undefined;

  const handleClick = (e) => {
    e.stopPropagation()
		setAnchorEl(e.currentTarget);
	}

	const handleClose = (e) => {
		e.stopPropagation()
		setAnchorEl(null)
	};

  return (
    <Box>
      <ActionIconButton
        aria-describedby={id}
        variant="iconWithBg"
        onClick={handleClick}
      />
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        sx={{ top: "2px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <PopoverContentWrapper>
          <PopoverItemWrapper onClick={onMessage}>
            <BiMessageSquareDetail size="20px" />
            <Typography fontSize="15px">Message {name}</Typography>
          </PopoverItemWrapper>

          <PopoverItemWrapper onClick={onRemove}>
            <FiUserX size="20px" />
            <Typography fontSize="15px">Unfriend {name}</Typography>
          </PopoverItemWrapper>
        </PopoverContentWrapper>
      </Popover>
    </Box>
  );
};

CardActionsPopover.propTypes = {
  name: PropTypes.string,
  onMessage: PropTypes.func,
  onRemove: PropTypes.func,
};

CardActionsPopover.displayName = "CardActionsPopover";

export default CardActionsPopover;
