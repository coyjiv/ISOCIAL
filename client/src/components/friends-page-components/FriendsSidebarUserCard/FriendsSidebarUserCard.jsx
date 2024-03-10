import PropTypes from 'prop-types'
import { Avatar, Stack, Typography } from '@mui/material'

import {
  CardContentWrapper,
  CardWrapper,
} from './FriendsSidebarUserCard.styled.js'
import { CardActionsPopover } from './CardActionsPopover'
import { ButtonMain } from '../../buttons'

const FriendsSidebarUserCard = ({
  variant,
  userImage,
  fullName,
  onConfirm,
  onAddToFriends,
  onHideSuggestion,
  onDecline,
  onRemove,
  onMessage,
  onClick,
}) => {
  const isFriendsVariant = variant === 'friends'
  const isSuggestionVariant = variant === 'suggestions'

  const confirmBtnText = isSuggestionVariant ? 'Add friend' : 'Confirm'
  const declineBtnText = isSuggestionVariant ? 'Dont show' : 'Delete'

  const handleConfirmBtnClick = (e) => {
    e.stopPropagation()

    isSuggestionVariant ? onAddToFriends() : onConfirm()
  }

  const handleDeclineBtnClick = (e) => {
    e.stopPropagation()

    isSuggestionVariant ? onHideSuggestion() : onDecline()
  }

  return (
    <CardWrapper variant={variant} onClick={onClick}>
      <Stack direction="row" gap="8px" alignItems="center">
        <Avatar
          src={userImage?.[0]}
          alt={fullName}
          sx={{ width: 60, height: 60 }}
        />
        <CardContentWrapper variant={variant}>
          <Typography fontSize="17px" fontWeight="500">
            {fullName}
          </Typography>

          {isFriendsVariant && (
            <CardActionsPopover
              name={fullName}
              onRemove={onRemove}
              onMessage={onMessage}
            />
          )}
          {!isFriendsVariant && (
            <Stack direction="row" gap="6px" width="100%">
              <ButtonMain onClick={handleConfirmBtnClick}>
                {confirmBtnText}
              </ButtonMain>
              <ButtonMain color="grey" onClick={handleDeclineBtnClick}>
                {declineBtnText}
              </ButtonMain>
            </Stack>
          )}
        </CardContentWrapper>
      </Stack>
    </CardWrapper>
  )
}

FriendsSidebarUserCard.propTypes = {
  variant: PropTypes.oneOf(['friends', 'requests', 'suggestions']),
  fullName: PropTypes.string,
  userImage: PropTypes.array,
  onMessage: PropTypes.func,
  onConfirm: PropTypes.func,
  onAddToFriends: PropTypes.func,
  onHideSuggestion: PropTypes.func,
  onDecline: PropTypes.func,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}

FriendsSidebarUserCard.displayName = 'FriendsSidebarUserCard'

export default FriendsSidebarUserCard
