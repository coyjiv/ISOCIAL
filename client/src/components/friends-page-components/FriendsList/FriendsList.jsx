import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
	Stack,
	Typography,
	Link,
	Button,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useNavigate } from 'react-router'
import { IoMdArrowDropdown } from "react-icons/io";
import { useGetUsersQuery } from "../../../store/services/usersService.js";

import { FriendCard } from "../index";
import { FriendCardSkeleton } from "../FriendCard/FriendCardSkeleton";
import { ExpandedWrapper, FriendsListWrapper } from "./FriendsList.styled.js";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from '../../PostsWrapper/postsWrapper.module.scss'

const FriendsList = ({
	variant,
	heading,
	link,
	onDecline,
	onConfirm,
	onAddFriend,
	onDontShowClick,
}) => {

	//@TODO : replace to operated data based on a variant
	const userId = localStorage.getItem('userId')
	const [page, setPage] = useState(0)
	const { data: usersData, isLoading, isSuccess } = useGetUsersQuery(page)
	const { data: friends } = useGetFriendsListQuery(userId)
	const { data: requests, isLoading: isRequestsLoading } = useAvailableFriendRequestsQuery()

	const [users, setUsers] = useState([]);

	const range = [...Array(5).keys()];
	const isUsers = users?.length > 0;
	const { breakpoints } = useTheme();
	const isMatches = useMediaQuery(breakpoints.up(1200));
	const navigate = useNavigate();

	const isShowButton = users?.length < 4 && isMatches;

	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	const handleShowUser = (id) => {
		if (variant === "requests") {
			navigate(`/friends/requests?id=${id}`);
		} else {
			navigate(`/profile/${id}`);
		}
	}

	useEffect(() => {
		if (isSuccess && usersData?.content) {
			setUsers(prevPosts => [...prevPosts, ...usersData.content]);
		}
	}, [usersData, isSuccess]);

	const fetchMoreData = () => {
		setPage(prevPage => prevPage + 1);
	};

	if (isLoading) {
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
			<ExpandedWrapper active={expanded ? "expanded" : undefined}>
				{isUsers ? (
					<InfiniteScroll
						dataLength={users.length}
						next={fetchMoreData}
						hasMore={usersData?.hasNext}
						loader={<div style={{ display: 'flex', width: '100%' }}><FriendCardSkeleton /></div>}
						className={styles.infiniteWrapper}
					>
						{
							users?.map(({ id, firstName, lastName, avatarsUrl }) => (
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
							))
						}
					</InfiniteScroll>
				) : (
					<Typography>You don&apos;t have any friends yet</Typography>
				)}
			</ExpandedWrapper>
			{!expanded && !isShowButton && (
				<Button
					variant="text"
					endIcon={<IoMdArrowDropdown />}
					onClick={handleExpand}
				>
					See more
				</Button>
			)}
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
