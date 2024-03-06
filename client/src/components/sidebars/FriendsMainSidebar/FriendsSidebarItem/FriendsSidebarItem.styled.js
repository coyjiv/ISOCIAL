import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const ItemWrapper = styled(Stack)(({ selected, theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: "12px 8px",
  borderRadius: "4px",
  justifyContent: "space-between",
  cursor: "pointer",
  backgroundColor: !selected ? "transparent" : theme.palette.background?.field,

  "&:hover": {
    backgroundColor: selected
      ? theme.palette.background?.field
      : theme.palette.background?.lightGrey,
  },
}));

export const IconWrapper = styled(Stack)(({ selected, theme }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: selected ? theme.palette.white : theme.palette.black,
  backgroundColor: selected
    ? theme.palette.primaryButtonBackground
    : theme.palette.background?.grey,
}));
