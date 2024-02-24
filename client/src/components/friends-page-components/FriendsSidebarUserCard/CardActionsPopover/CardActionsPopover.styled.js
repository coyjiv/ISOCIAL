import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const PopoverContentWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.white,

  padding: "8px",
}));

export const PopoverItemWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  padding: "8px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background-color 0.25s ease",
  ":hover": {
    backgroundColor: theme.palette.background.lightGrey,
  },
}));
