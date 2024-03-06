import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const SkeletonWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "84px",
  borderRadius: "6px",
  backgroundColor: theme.palette.white,
  padding: "8px 10px",
}));
