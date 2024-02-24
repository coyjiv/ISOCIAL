import PropTypes from "prop-types";
import { Typography, useTheme } from "@mui/material";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";

import { iconsMap } from "./ActionIconButton.utils.jsx";
import { ButtonBase } from "./ActionIconButton.styled";

const ActionIconButton = ({
  variant,
  icon,
  color,
  filledOnPress,
  withHover,
  children,
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { palette } = useTheme();
  const defaultColor = palette.background.colorAction ?? "black";
  const hasFilledColor = isPressed && filledOnPress;

  let buttonColor = color ? color : defaultColor;

  if (hasFilledColor) {
    buttonColor = palette.primaryButtonBackground;
  }

  const handleClick = (e) => {
    setIsPressed(!isPressed);
    onClick?.(e);
  };

  return (
    <ButtonBase
      variant={variant}
      color={buttonColor}
      withHover={withHover}
      onClick={handleClick}
      {...props}
    >
      {hasFilledColor ? (
        <BiSolidLike size="20" color="inherit" />
      ) : (
        iconsMap[icon]
      )}
      {variant === "text" && (
        <Typography color={hasFilledColor && buttonColor}>
          {children}
        </Typography>
      )}
    </ButtonBase>
  );
};

ActionIconButton.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.oneOf(["icon", "text", "iconWithBg"]).isRequired,
  icon: PropTypes.oneOf([
    "dots",
    "close",
    "like",
    "comment",
    "share",
    "settings",
    "notification",
    "arrowLeft",
    "arrowRight",
  ]),
  filledOnPress: PropTypes.bool,
  withHover: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

ActionIconButton.defaultProps = {
  variant: "icon",
  icon: "dots",
  withHover: true,
};

ActionIconButton.displayName = "ActionIconButton";

export default ActionIconButton;
