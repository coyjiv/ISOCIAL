import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const FriendsListWrapper = styled(Stack)({
  width: "100%",
});

export const ExpandedWrapper = styled(Stack)(({ active }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "20px",
  transition: "all 0.45s ease",
  maxHeight: active ? "100%" : "634px",
  overflowY: !active ? "hidden" : "auto",
}));
