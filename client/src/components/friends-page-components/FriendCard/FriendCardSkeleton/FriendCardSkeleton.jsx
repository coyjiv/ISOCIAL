import { Skeleton, Stack } from "@mui/material";
import { CardSkeletonWrapper } from "./FriendCardSkeleton.styled";
import PropTypes from "prop-types";

const FriendCardSkeleton = ({ variant = 'default' }) => {
  return variant === 'default' ? (
    <CardSkeletonWrapper>
      <Skeleton variant="rounded" width="100%" height="208px" />
      <Stack padding="12px">
        <Skeleton
          variant="text"
          width="130px"
          height="30px"
          sx={{ marginBottom: "15px" }}
        />
        <Stack gap="8px">
          <Skeleton variant="rounded" width="100%" height="30px" />
          <Skeleton variant="rounded" width="100%" height="30px" />
        </Stack>
      </Stack>
    </CardSkeletonWrapper>
  ) : (
    <div>
      <Stack direction='row' columnGap={2}>
        <Skeleton variant="rounded" width="80px" height="80px" />
        <Stack justifyContent='center' padding="12px">
          <Skeleton
            variant="text"
            width="130px"
            height="30px"
            sx={{ marginBottom: "0px", display: "inline-block" }}
          />
          <Skeleton
            variant="text"
            width="50px"
            height="20px"
            sx={{ marginBottom: "0px" }}
          />
        </Stack>
      </Stack>
    </div>
  )
};

FriendCardSkeleton.displayName = "FriendCardSkeleton";
FriendCardSkeleton.propTypes = {
  variant: PropTypes.oneOf(["default", "horizontal"]),
};


export default FriendCardSkeleton;
