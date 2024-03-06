import PropTypes from "prop-types";
import { Skeleton, Stack } from "@mui/material";
import { SkeletonWrapper } from "./FriendsSidebarUserCardSkeleton.styled.js";

const FriendsSidebarUserCardSkeleton = ({ variant }) => {
  const isRequests = variant === "requests";

  return (
    <SkeletonWrapper>
      <Stack direction="row" gap="8px" alignItems="center">
        <Skeleton variant="circular" sx={{ minWidth: 60, minHeight: 60 }} />
        <Stack
          width="100%"
          direction={isRequests ? "column" : "row"}
          alignItems={isRequests ? "flex-start" : "center"}
          justifyContent={isRequests ? "flex-start" : "space-between"}
        >
          <Skeleton variant="text" width="100px" height="25px" />
          {isRequests ? (
            <Stack width="100%" direction="row" gap="8px">
              <Skeleton variant="rounded" width="100%" height="28px" />
              <Skeleton variant="rounded" width="100%" height="28px" />
            </Stack>
          ) : (
            <Skeleton variant="circular" sx={{ minWidth: 36, minHeight: 36 }} />
          )}
        </Stack>
      </Stack>
    </SkeletonWrapper>
  );
};

FriendsSidebarUserCardSkeleton.propTypes = {
  variant: PropTypes.string,
};

FriendsSidebarUserCardSkeleton.displayName = "FriendsSidebarUserCardSkeleton";

export default FriendsSidebarUserCardSkeleton;
