import PropTypes from 'prop-types'
import { GiEarthAmerica } from 'react-icons/gi'
import { Typography, Stack, Avatar, useTheme } from '@mui/material'

import { PostFollowButton } from '../../../ui/PostCard/PostFollowButton'
import { PostHeaderWrapper } from './PostHeader.styled'

const PostHeader = ({ author, avatar, description, timestamp }) => {
  const { palette } = useTheme()

  return (
    <PostHeaderWrapper>
      <Stack direction="row" alignItems="center" gap="10px">
        <Avatar src={avatar} alt={author} />
        <Stack>
          <Stack direction="row" alignItems="center" gap="2px">
            <Typography fontWeight="600">{author}</Typography>
            ·
            <PostFollowButton />
          </Stack>
          <Stack direction="row" alignItems="center" gap="2px">
            <Typography fontSize="14px" color="text.grey">
              Recommended post · {timestamp} ·
            </Typography>
            <GiEarthAmerica size={14} color={palette.text?.grey} />
          </Stack>
        </Stack>
      </Stack>
      <Typography>{description}</Typography>
    </PostHeaderWrapper>
  )
}

PostHeader.propTypes = {
  avatar: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  timestamp: PropTypes.string,
}

PostHeader.displayName = 'PostHeader'

export default PostHeader
