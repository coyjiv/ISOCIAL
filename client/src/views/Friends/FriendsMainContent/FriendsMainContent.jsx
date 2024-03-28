import { useLocalStorage } from 'usehooks-ts'
import { Divider } from '@mui/material'

import { FriendsList } from '../../../components/friends-page-components'
import {
	useAcceptFriendRequestMutation,
	useDeclineFriendRequestMutation,
	useSendFriendRequestMutation,
} from '../../../store/services/friendService'
import { LS_KEYS } from '../../../utils/constants'
import { MainContentWrapper } from './FriendsMainContent.styled'
import PropTypes from 'prop-types'

const FriendsMainContent = ({ hidden }) => {

	const [hiddenUsersId, setHiddenUsersId] = useLocalStorage(
		LS_KEYS.HIDDEN_USERS,
		[],
	)



	const [acceptFriendRequest] = useAcceptFriendRequestMutation()
	const [declineFriendRequest] = useDeclineFriendRequestMutation()
	const [sendFriendRequest] = useSendFriendRequestMutation()

	const handleMessage = (id) => {
		console.log(`start messages with user ${id}`)
	}

	const handleConfirm = (e, id) => {
		e.stopPropagation()
		acceptFriendRequest({ userId: id })
	}

	const handleDecline = (e, id) => {
		e.stopPropagation()
		declineFriendRequest({ userId: id })
	}

	const handleDontShowUser = (e, id) => {
		e.stopPropagation()
		setHiddenUsersId([...hiddenUsersId, id])
	}

	return (
		<MainContentWrapper hidden={hidden}>
			<FriendsList
				variant="requests"
				heading="Friend Requests"
				link={'/friends/requests'}
				onConfirm={handleConfirm}
				onDecline={handleDecline}
			/>
			<Divider orientation="horizontal" sx={{ margin: "12px 0" }} />
			<FriendsList
				variant="recommendations"
				heading="People you may know"
				link={'/friends/suggestions'}
				onAddFriend={sendFriendRequest}
				onMessage={handleMessage}
				onDecline={handleDecline}
				onDontShowClick={handleDontShowUser}
			/>
		</MainContentWrapper>
	)
}

FriendsMainContent.propTypes = {
	hidden: PropTypes.bool,
}

FriendsMainContent.displayName = 'FriendsMainContent'

export default FriendsMainContent
