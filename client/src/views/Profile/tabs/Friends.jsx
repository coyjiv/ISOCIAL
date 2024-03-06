import {
  Box,
  Container,
  Input,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "../profile.module.scss";
import { ImSearch } from "react-icons/im";
import { useGetFriendsListQuery } from "../../../store/services/friendService";
import { useState } from "react";
import { MiniCard } from "../../../components/miniCard/miniCard";

const Friends = () => {
  const { id } = useParams();
  const fetchUserId = id ?? localStorage.getItem("userId");
  const [page] = useState(0);

  const { data: friends, isLoading } = useGetFriendsListQuery(
    {
      id: fetchUserId,
      page,
      size: 10,
    },
    { skip: !fetchUserId }
  );

  console.log(friends, isLoading);
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
      <Container
        className={styles.friendsContainer}
        maxWidth={"lg"}
        sx={{ p: 2 }}
      >
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Typography marginTop={2} fontWeight={900} fontSize={20}>
              Friends
            </Typography>
            <div className={styles.friends}>
              <Typography marginY={2}>
                <Input
                  disableUnderline
                  className={styles.input}
                  startAdornment={
                    <InputAdornment marginRight={30} position="start">
                      <ImSearch className={styles.search} />
                    </InputAdornment>
                  }
                  placeholder="Search"
                />
              </Typography>
              <Link className={styles.requestsLink}>
                <Typography>Friend requests</Typography>
              </Link>
            </div>
          </div>
          <div className={styles.wrapperCards}>
            {friends && friends?.length > 0 ? (
              friends?.map((friend) => (
                <MiniCard key={friend.id} user={friend} />
              ))
            ) : (
              <h3>
                Lonely here, but keeping positive vibes! 🌟 Feel free to connect
                and brighten up the tab with your friendship. 🤝
                #LookingForFriends
              </h3>
            )}
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Friends;
