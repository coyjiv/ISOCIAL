import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import { text } from "./ButtonMain.utils";
import { ButtonMainBase } from "./ButtonMain.styled";

const ButtonMain = ({
  children,
  variant,
  color,
  fullWidth,
  onClick,
  ...props
}) => {
  return (
    <ButtonMainBase
      bgcolor={color}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
    >
      <Typography color={text[color]} fontSize="15px" fontWeight="600">
        {children}
      </Typography>
    </ButtonMainBase>
  );
};

ButtonMain.propTypes = {
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  color: PropTypes.oneOf(["blue", "grey"]),
  onClick: PropTypes.func,
  children: PropTypes.any,
};

ButtonMain.defaultProps = {
  fullWidth: true,
  variant: "contained",
  color: "blue",
};

ButtonMain.displayName = "ButtonMain";

export default ButtonMain;
