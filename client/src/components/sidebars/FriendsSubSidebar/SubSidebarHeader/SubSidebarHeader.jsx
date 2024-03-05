import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

import { Link } from "../../../index";
import ActionIconButton from "../../../buttons/ActionIconButton";
import { HeaderWrapper } from "./SubSidebarHeader.styled";

const SubSidebarHeader = ({ heading, link, children }) => {
  return (
    <HeaderWrapper>
      <Stack direction="row" alignItems="center" gap="12px">
        <Link to={link}>
          <ActionIconButton icon="arrowLeft" />
        </Link>
        <Stack>
          <Link to={link}>Friends</Link>
          <Typography fontWeight="600" fontSize="24px">
            {heading}
          </Typography>
        </Stack>
      </Stack>
      {children}
    </HeaderWrapper>
  );
};

SubSidebarHeader.propTypes = {
  withSearch: PropTypes.bool,
  link: PropTypes.string,
  heading: PropTypes.string,
  children: PropTypes.any,
};

SubSidebarHeader.displayName = "SubSidebarHeader";

export default SubSidebarHeader;
