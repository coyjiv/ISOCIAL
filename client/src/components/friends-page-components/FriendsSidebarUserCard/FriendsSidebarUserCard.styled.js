import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const cardWrapper = {
  friends: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  requests: {
    gap: "8px",
  },
};

export const CardWrapper = styled(Stack)(({ theme }) => ({
  borderRadius: "6px",
  backgroundColor: theme.palette.white,
  cursor: "pointer",
  transition: "background-color 0.25s ease",
  padding: "8px 10px",
  ":hover": {
    backgroundColor: theme.palette.background.lightGrey,
  },
}));

export const CardContentWrapper = styled(Stack)(({ variant }) => ({
  width: "100%",
  ...cardWrapper[variant],
}));
