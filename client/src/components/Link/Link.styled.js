import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const getLinkStyle = (theme) => ({
  grey: {
    color: theme.palette.background.colorAction,
  },
  blue: {
    color: theme.palette.primaryButtonBackground,
  },
});

export const LinkBase = styled(Link)(({ color, theme }) => ({
  textDecoration: "none",
  width: "fit-content",
  cursor: "pointer",
  fontSize: "13px",
  "&:hover": {
    textDecoration: "underline",
  },
  ...getLinkStyle(theme)[color],
}));
