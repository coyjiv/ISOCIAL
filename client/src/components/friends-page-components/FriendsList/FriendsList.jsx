import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
	Stack,
	Typography,
	Link,
} from "@mui/material";
import { useNavigate } from 'react-router'

import { FriendCard } from "../index";
import { FriendCardSkeleton } from "../FriendCard/FriendCardSkeleton";
import { ExpandedWrapper, FriendsListWrapper } from "./FriendsList.styled.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetRecommendationsQuery, useAvailableFriendRequestsQuery } from '../../../store/services/friendService.js'
import FriendsNoUserSection from "../../../views/Friends/FriendsNoUserSection/FriendsNoUserSection.jsx";
import styles from '../FriendsList/infiniteWrapper.module.scss'

const FriendsList = ({
	variant,
	heading,
	link,
	onDecline,
	onConfirm,
	onAddFriend,
	onDontShowClick,
}) => {

	const [page, setPage] = useState(0)

	const { data: friendsData, isSuccess } = useGetRecommendationsQuery(page, { skip: variant !== 'recommendations' })
	const { data: friendRequests, isSuccess: isSuccessRecommendations } = useAvailableFriendRequestsQuery(page, { skip: variant !== 'requests' })

	const operatedData = variant === 'recommendations' ? friendsData : friendRequests;
	const operatedSuccess = variant === 'recommendations' ? isSuccess : isSuccessRecommendations;

	const [data, setData] = useState([]);

	useEffect(() => {
		if (operatedSuccess && operatedData?.content) {
			setData(prevData => {
				// Create a new map to ensure uniqueness based on the item's id.
				const dataMap = new Map();

				// Fill the map with the previous data.
				prevData.forEach(item => dataMap.set(item.id, item));

				// Add new items to the map, preventing duplicates.
				operatedData.content.forEach(item => {
					if (!dataMap.has(item.id)) {
						dataMap.set(item.id, item);
					}
				});

				// Return a new array created from the map's values.
				return Array.from(dataMap.values());
			});
		}
	}, [operatedData, operatedSuccess]);

	const fetchMoreData = () => {
		setPage(prevPage => prevPage + 1);
	};

	const navigate = useNavigate();


	const handleShowUser = (id) => {
		if (variant === "requests") {
			navigate(`/friends/requests?id=${id}`);
		} else {
			navigate(`/profile/${id}`);
		}
	}

	const onDelete = (id) => {
		setData(prevData => {
			return prevData.filter(item => item.id !== id)
		})
	}

	// const range = [...Array(5).keys()];

	if (data.length === 0) {
		return (
			<FriendsListWrapper>
				<Stack
					direction="row"
					justifyContent="space-between"
					marginBottom="20px"
				>
					<Typography fontSize="20px" fontWeight="700">
						{heading}
					</Typography>
				</Stack>
				<FriendsNoUserSection customTitle={variant === 'recommendations' ? 'There will be your recommendations, based on your friends' : 'You have no friend requests'} />
			</FriendsListWrapper>
		);
	}

	return (
		<FriendsListWrapper>
			<Stack direction="row" justifyContent="space-between" marginBottom="20px">
				<Typography fontSize="20px" fontWeight="700">
					{heading}
				</Typography>
				<Link href={link} underline="none">
					See All
				</Link>
			</Stack>
			<ExpandedWrapper>
				<InfiniteScroll
					dataLength={data.length}
					next={fetchMoreData}
					hasMore={operatedData?.hasNext}
					loader={<div style={{ display: 'flex', width: '100%' }}><FriendCardSkeleton /></div>}
					className={styles.infiniteWrapper}
					height={770}
				>
					{data?.map(({ id, firstName, lastName, avatarsUrl }) => (
						<FriendCard
							variant={variant}
							key={id}
							id={id}
							fullName={`${firstName} ${lastName}`}
							images={avatarsUrl}
							onConfirm={(e) => { onConfirm(e, id); onDelete(id) }}
							onDelete={(...args) => { onDecline(...args); onDelete(id) }}
							onAddFriend={(...args) => { onAddFriend(...args); onDelete(id) }}
							onClick={() => handleShowUser(id)}
							onDontShowClick={(...args) => { onDontShowClick(...args); onDelete(id) }}
						/>
					))}
				</InfiniteScroll>
			</ExpandedWrapper>
		</FriendsListWrapper>
	);
};

FriendsList.propTypes = {
	variant: PropTypes.oneOf(["recommendations", "requests"]),
	users: PropTypes.array,
	heading: PropTypes.string,
	link: PropTypes.string,
	isLoading: PropTypes.bool,
	onDecline: PropTypes.func,
	onConfirm: PropTypes.func,
	onAddFriend: PropTypes.func,
	onDontShowClick: PropTypes.func,
}

FriendsList.displayName = "FriendsList";

export default FriendsList;
