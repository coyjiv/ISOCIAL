import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const SearchItemWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "56px",
  borderRadius: "4px",
  flexDirection: "row",
  gap: "12px",
  padding: "12px 8px",
  cursor: "pointer",
  alignItems: "center",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.background.lightGrey,
  },
}));
