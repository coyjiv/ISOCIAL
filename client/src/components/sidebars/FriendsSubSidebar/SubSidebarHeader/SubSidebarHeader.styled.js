import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const HeaderWrapper = styled(Stack)(({ theme }) => ({
  padding: "8px",
  borderBottom: "1px solid",
  borderColor: theme.palette.greyBorder,
  width: "100%",
  gap: "14px",
}));
