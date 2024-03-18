import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { FriendsUserProfileSection } from "../FriendsUserProfileSection";
import { useGetFriendsListQuery } from "../../../store/services/friendService";

const FriendsAllPage = () => {
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState(0)

  const { data, isLoading, isSuccess } = useGetFriendsListQuery(userId, page);

  const [friends, setFriends] = useState([])


  useEffect(() => {
    if (isSuccess && data?.content) {
      setFriends(prevData => [...new Set([...prevData, ...data.content])]);
    }
  }, [data, isSuccess]);

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="friends"
        users={friends}
        heading="All Friends"
        subTitle="Friends"
        withSearch
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        hasNext={data?.hasNext}
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsAllPage.displayName = "FriendsAll";

const FriendsAll = withLayout(FriendsAllPage);

export default FriendsAll;
