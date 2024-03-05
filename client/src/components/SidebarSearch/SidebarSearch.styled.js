import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const SearchContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  borderRadius: "16px",
  alignItems: "center",
  gap: "6px",
  backgroundColor: theme.palette.background.field,
  padding: "8px",
}));

export const SearchBase = styled.input({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "transparent",
});
