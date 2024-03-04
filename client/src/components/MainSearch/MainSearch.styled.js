import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export const LogoContainer = styled(Stack)(({ open }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: open ? "67px" : "109px",
  overflow: "hidden",
  transition: "all 0.15s ease-in-out",
}));

export const SearchIcon = styled(FiSearch)(({ open, theme }) => ({
  width: open ? "0px" : "20px",
  height: "20px",
  color: theme.palette.greyColor,
  transition: "all 0.15s ease-in-out",
}));

export const LogoHiddenContentWrapper = styled(Stack)(({ open }) => ({
  flexDirection: "row",
  transform: `translateX(${open ? "-67px" : "0"})`,
  transition: "all 0.15s ease-in-out",
  paddingLeft: "16px",
}));

export const SearchWrapper = styled(Stack)(({ open }) => ({
  padding: "7px 8px 7px 0",
  flexDirection: "row",
  gap: open ? "2px" : "8px",
  maxWidth: "360px",
  minWidth: "360px",
  alignItems: "center",
  position: "relative",
  transition: "all 0.15s ease-in-out",
  boxShadow: open
    ? "0 12px 12px rgba(0, 0, 0, 0.2), inset 0 0 0 0 rgba(255, 255, 255, 0.5);"
    : "none",
}));

export const LogoLink = styled(Link)(({ open }) => ({
  opacity: open ? "0" : "1",
  transition: "all 0.1s ease-in-out",
}));

export const SearchBase = styled.input(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  fontSize: "16px",
  backgroundColor: "transparent",
  fontFamily: theme.typography.body1.fontFamily,
  transition: "all 0.15s ease-in-out",
  "&::placeholder": {
    fontFamily: theme.typography.body1.fontFamily,
  },
}));

export const SearchContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  borderRadius: "20px",
  alignItems: "center",
  width: "100%",
  gap: "4px",
  backgroundColor: theme.palette.background.field,
  padding: "8px",
}));

export const SearchMenu = styled(Stack)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: "52px",
  left: "0",
  gap: "4px",
  backgroundColor: theme.palette.white,
  padding: "20px 8px 8px 8px",
  borderRadius: "0 0 8px 8px",
  transition: "all 0.15s ease-in-out",
  boxShadow: "0 2px 0px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
}));
