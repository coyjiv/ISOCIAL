import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { MQ_MUI } from "../../../utils/constants";

export const SidebarWrapper = styled(Stack)(({ theme }) => ({
  minWidth: "360px",
  height: "94vh",
  position: "sticky",
  top: "56px",
  left: "0",
  backgroundColor: theme.palette?.white,
  boxShadow:
    "5px 0 5px -5px rgba(0, 0, 0, 0.2), -2px 0 2px -2px rgba(0, 0, 0, 0.2)",
  padding: "8px 8px 8px 8px",
  [theme.breakpoints.down(MQ_MUI.MOBILE)]: {
    minWidth: "100%",
  },
}));

export const SidebarItemsList = styled(Stack)({
  paddingTop: "12px",
  overflow: "auto",
});
