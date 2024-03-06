import { Stack, Typography } from "@mui/material";

const MainSearchEmptySection = () => {
  return (
    <Stack
      width="100%"
      height="200px"
      alignItems="center"
      justifyContent="center"
    >
      <Typography fontSize="17px" fontWeight="500">
        Please start typing...
      </Typography>
    </Stack>
  );
};

MainSearchEmptySection.displayName = "MainSearchEmptySection";

export default MainSearchEmptySection;
