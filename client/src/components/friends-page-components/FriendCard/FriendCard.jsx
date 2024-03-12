import PropTypes from 'prop-types'
import { Avatar, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { ButtonMain } from '../../buttons'
import { CardContentWrapper, CardWrapper } from './FriendCard.styled.js'
import { useState } from 'react'

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

	const truncateText = (text, maxLength) => {
		return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
	};

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

			onDelete(e, id)
			setMsg('')
		}
	}

	return (
		<CardWrapper onClick={onClick}>
			<Box width="194px" height="190px">
				<Avatar
					src={images[0]}
					alt={fullName}
					variant="square"
					sx={{
						width: '100%',
						height: '100%',
						fontSize: '60px',
					}}
				/>
			</Box>
			<CardContentWrapper>
				<Typography
					fontSize="20px"
					fontWeight="600"
					marginBottom={!msg ? '30px' : '0'}
				>
					{truncateText(fullName, 14)}
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
	variant: PropTypes.oneOf(['friends', 'requests']),
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
