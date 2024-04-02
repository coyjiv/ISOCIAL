import { useState, useEffect } from "react";
import {
  useGetFriendsListQuery,
  useRemoveFriendMutation,
} from "../../../../store/services/friendService";
import { FriendCardSkeleton } from "../../../../components/friends-page-components/FriendCard/FriendCardSkeleton";
import { FriendCard } from "../../../../components/friends-page-components";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./friendTabs.module.scss";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pickOneUserFact } from "../../../../utils/helpers/userFacts";
import { FriendsNoUserSection } from "../../../Friends/FriendsNoUserSection";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const AllFriends = () => {
  const { id: userId } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const { data, isSuccess } = useGetFriendsListQuery({
    id: userId ?? searchParams.get("id") ?? localStorage.getItem("userId"),
    page: page,
  });
  const [removeFriend] = useRemoveFriendMutation();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (isSuccess && data?.content) {
      setFriends((prevData) => {
        const dataMap = new Map();

        // Fill the map with the previous data.
        prevData.forEach((item) => dataMap.set(item.id, item));

        data.content.forEach((item) => {
          if (!dataMap.has(item.id)) {
            dataMap.set(item.id, item);
          }
        });

        return Array.from(dataMap.values());
      });
    }
  }, [data, isSuccess]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleShowUser = (id) => {
    navigate(`/profile/${id}`);
  };

  const onDelete = (id) => {
    setFriends((prevData) => {
      return prevData.filter((item) => item.id !== id);
    });
  };
  if (!data) {
    return (
      <Stack
        marginTop={3}
        marginX={1}
        padding={1}
        marginBottom={1}
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        rowGap={2}
      >
        <FriendCardSkeleton variant="horizontal" />
        <FriendCardSkeleton variant="horizontal" />
        <FriendCardSkeleton variant="horizontal" />
        <FriendCardSkeleton variant="horizontal" />
      </Stack>
    );
  }

  return (
    <div>
      {friends.length === 0 && (
        <FriendsNoUserSection customTitle={"You have no friends...yet"} />
      )}
      <InfiniteScroll
        dataLength={friends.length}
        next={fetchMoreData}
        hasMore={data?.hasNext}
        loader={
          <div style={{ display: "flex", width: "100%" }}>
            <FriendCardSkeleton variant="horizontal" />
          </div>
        }
        className={styles.infiniteWrapper}
      >
        {friends?.map(
          ({
            id,
            firstName,
            lastName,
            avatarsUrl,
            city,
            studyPlace,
            birthPlace,
            chatId,
            activityStatus,
          }) => (
            <FriendCard
              variant={"horizontal"}
              key={id}
              id={id}
              fullName={`${firstName} ${lastName}`}
              friend={{
                id,
                firstName,
                lastName,
                avatarsUrl,
                chatId,
                status: activityStatus,
              }}
              images={avatarsUrl}
              additionalInfo={pickOneUserFact(city, studyPlace, birthPlace)}
              // onConfirm={(e) => { onConfirm(e, id); onDelete(id) }}
              onDelete={(e) => {
                e.stopPropagation();
                removeFriend({ friendUserId: id });
                onDelete(id);
              }}
              // onAddFriend={(...args) => { onAddFriend(...args); onDelete(id) }}
              onClick={() => handleShowUser(id)}
              // onDontShowClick={(...args) => { onDontShowClick(...args); onDelete(id) }}
            />
          ),
        )}
      </InfiniteScroll>
    </div>
  );
};

export default AllFriends;
