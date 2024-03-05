import { Skeleton, Stack } from "@mui/material";
import { CardSkeletonWrapper } from "./FriendCardSkeleton.styled";

const FriendCardSkeleton = () => {
  return (
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
  );
};

FriendCardSkeleton.displayName = "FriendCardSkeleton";

export default FriendCardSkeleton;
