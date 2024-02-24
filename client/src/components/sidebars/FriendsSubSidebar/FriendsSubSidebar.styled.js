import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const SidebarWrapper = styled(Stack)(({ theme }) => ({
  minWidth: "360px",
  height: "100%",
  backgroundColor: theme.palette?.white,
  boxShadow:
    "5px 0 5px -5px rgba(0, 0, 0, 0.2), -2px 0 2px -2px rgba(0, 0, 0, 0.2)",
  padding: "8px 8px 8px 8px",
}));

export const SidebarItemsList = styled(Stack)({
  paddingTop: "12px",
  overflow: "auto",
});
