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
import { useGetFriendsListQuery, useAvailableFriendRequestsQuery } from '../../../store/services/friendService.js'
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

	const userId = localStorage.getItem('userId')
	const { data: friendsData, isSuccess } = useGetFriendsListQuery(userId, page, { skip: variant !== 'friends' })
	const { data: friendRequests, isSuccess: isSuccessRecommendations } = useAvailableFriendRequestsQuery(page, { skip: variant !== 'requests' })

	const operatedData = variant === 'friends' ? friendsData : friendRequests;
	const operatedSuccess = variant === 'friends' ? isSuccess : isSuccessRecommendations;

	const [data, setData] = useState([]);

	useEffect(() => {
		if (operatedSuccess && operatedData?.content) {
			setData(prevData => [...new Set([...prevData, ...operatedData.content])]);
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
	const range = [...Array(5).keys()];

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
					<Link href={link} underline="none">
						See All
					</Link>
				</Stack>
				<Stack direction="row" flexWrap="wrap" gap="20px">
					{range.map((item) => (
						<FriendCardSkeleton key={item} />
					))}
				</Stack>
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
					height={750}
				>
					{data?.map(({ id, firstName, lastName, avatarsUrl }) => (
						<FriendCard
							variant={variant}
							key={id}
							id={id}
							fullName={`${firstName} ${lastName}`}
							images={avatarsUrl}
							onConfirm={(e) => onConfirm(e, id)}
							onDelete={onDecline}
							onAddFriend={onAddFriend}
							onClick={() => handleShowUser(id)}
							onDontShowClick={onDontShowClick}
						/>
					))}
				</InfiniteScroll>
			</ExpandedWrapper>
		</FriendsListWrapper>
	);
};

FriendsList.propTypes = {
	variant: PropTypes.oneOf(["friends", "requests"]),
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
