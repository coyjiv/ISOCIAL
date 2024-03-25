import PropTypes from 'prop-types'
import { Avatar, Stack, Typography } from '@mui/material'

import { ButtonMain } from '../../buttons'
import { CardContentWrapper, CardWrapper, CardAvatarWrapper } from './FriendCard.styled.js'
import { useState } from 'react'
import { userAvatar } from '../../../data/placeholders.js'

const FriendCard = ({
	id,
	variant,
	fullName,
	images,
	onDelete,
	onConfirm,
	onAddFriend,
	onDontShowClick,
	onClick,
}) => {
	const [msg, setMsg] = useState('')
	const isRequestVariant = variant === 'requests'
	const [isRequesting, setIsRequesting] = useState(false)

	const handleClick = async (e) => {
		e.stopPropagation()

		if (!isRequesting) {
			const data = await onAddFriend({ userId: id })
			if (data.error) {
				setIsRequesting(false)
				setMsg(data?.error?.response?.data)
			} else {
				setIsRequesting(true)
				setMsg(data?.data)
			}
		} else {
			const data = await onAddFriend({ userId: id })
			if (data.error) {
				setMsg(data?.error?.response?.data)
				setIsRequesting(false)
			} else {
				setIsRequesting(true)
				setMsg(data?.data)
			}
			setMsg('')
		}
		onDelete(e, id)
	}

	return (
		<CardWrapper onClick={onClick}>
			<CardAvatarWrapper>
				<Avatar
					src={userAvatar({ avatarsUrl: images }, fullName.split(' ')[0], fullName.split(' ')[1])}
					alt={fullName}
					variant="square"
					sx={{
						width: '100%',
						height: '100%',
						fontSize: '60px',
					}}
				/>
			</CardAvatarWrapper>
			<CardContentWrapper>
				<Typography
					fontSize="20px"
					fontWeight="600"
					sx={{ fontSize: { xs: '18px', sm: '20px' }, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: { xs: '15px', sm: !msg ? '30px' : 0 } }}
					marginBottom={!msg ? '30px' : '0'}
				>
					{fullName}
				</Typography>

				<Typography fontSize="14px" marginBottom={!msg ? '0' : '9px'}>
					{msg}
				</Typography>
				{isRequestVariant && (
					<Stack gap="8px">
						<ButtonMain onClick={onConfirm}>Confirm</ButtonMain>
						<ButtonMain color="grey" onClick={(e) => onDelete(e, id)}>
							Delete
						</ButtonMain>
					</Stack>
				)}
				{!isRequestVariant && (
					<Stack gap="8px">
						<ButtonMain
							color={isRequesting ? 'grey' : 'blue'}
							onClick={(e) => handleClick(e)}
						>
							{isRequesting ? 'Cancel request' : 'Add to friends'}
						</ButtonMain>
						<ButtonMain color="grey" onClick={(e) => onDontShowClick(e, id)}>
							Dont Show
						</ButtonMain>
					</Stack>
				)}
			</CardContentWrapper>
		</CardWrapper>
	)
}

FriendCard.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.oneOf(['friends', 'requests', 'recommendations']),
	fullName: PropTypes.string,
	images: PropTypes.array,
	onDelete: PropTypes.func,
	onClick: PropTypes.func,
	onConfirm: PropTypes.func,
	onDontShowClick: PropTypes.func,
	onAddFriend: PropTypes.func,
}

FriendCard.displayName = 'FriendCard'

export default FriendCard
