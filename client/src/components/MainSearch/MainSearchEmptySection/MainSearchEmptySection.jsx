import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Spinner from "../../Spinner";

const MainSearchEmptySection = ({ isLoading }) => {
  return (
    <Stack
      width="100%"
      height="200px"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading ? <Spinner /> :
        <Typography fontSize="17px" fontWeight="500">
          No results found
        </Typography>
      }
    </Stack>
  );
};

MainSearchEmptySection.displayName = "MainSearchEmptySection";
MainSearchEmptySection.propTypes = {
  isLoading: PropTypes.bool,
};

export default MainSearchEmptySection;
