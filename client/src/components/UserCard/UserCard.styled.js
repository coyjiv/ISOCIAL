import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const UserCardWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: "680px",
  backgroundColor: theme.palette.white,
  borderRadius: "4px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "14px",
}));
