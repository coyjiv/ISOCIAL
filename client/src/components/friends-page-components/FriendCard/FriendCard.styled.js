import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const CardWrapper = styled(Stack)({
  borderRadius: "8px",
  overflow: "hidden",
  width: "fit-content",
  height: "fit-content",
	boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
	cursor: "pointer",
});

export const CardContentWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: "12px",
  backgroundColor: theme.palette.white,
}));
