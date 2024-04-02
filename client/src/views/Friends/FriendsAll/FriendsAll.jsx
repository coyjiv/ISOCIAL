import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

import { FriendsSubSidebar } from "../../../components/sidebars";
import { withLayout } from "../../../hooks/withLayout";
import { FriendsUserProfileSection } from "../FriendsUserProfileSection";
import { useGetFriendsListQuery } from "../../../store/services/friendService";

const FriendsAllPage = () => {
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState(0);

  const { data, isLoading, isSuccess } = useGetFriendsListQuery({
    id: userId,
    page: page,
  });

  const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   if (isSuccess && data?.content) {
  //     const newFriends = data.content.filter(friend => !friends.some(existingFriend => existingFriend.id === friend.id));
  //     if (newFriends.length > 0) {
  //       setFriends(prevData => [...prevData, ...newFriends]);
  //     }
  //   }
  // }, [data, isSuccess, friends]);

  useEffect(() => {
    if (isSuccess && data?.content) {
      setFriends((prevData) => {
        // Create a new map to ensure uniqueness based on the item's id.
        const dataMap = new Map();

        // Fill the map with the previous data.
        prevData.forEach((item) => dataMap.set(item.id, item));

        // Add new items to the map, preventing duplicates.
        data.content.forEach((item) => {
          if (!dataMap.has(item.id)) {
            dataMap.set(item.id, item);
          }
        });

        // Return a new array created from the map's values.
        return Array.from(dataMap.values());
      });
    }
  }, [data, isSuccess]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onRemove = (id) => {
    setFriends((prevData) => {
      return prevData.filter((item) => item.id !== id);
    });
  };

  console.log(friends);

  return (
    <Stack width="100%" direction="row" height="calc(100vh - 54px)">
      <FriendsSubSidebar
        variant="friends"
        friends={friends}
        heading="All Friends"
        subTitle="Friends"
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        hasNext={data?.hasNext}
        onRemove={onRemove}
      />
      <FriendsUserProfileSection />
    </Stack>
  );
};

FriendsAllPage.displayName = "FriendsAll";

const FriendsAll = withLayout(FriendsAllPage);

export default FriendsAll;
