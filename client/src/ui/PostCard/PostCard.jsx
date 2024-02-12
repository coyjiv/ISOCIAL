import PropTypes from 'prop-types'
import { Paper, Stack, CardMedia } from '@mui/material'

import { ActionIconButton } from '../../ui'
import { PostHeader } from './PostHeader'
import { PostFooter } from './PostFooter'
import s from './PostCard.module.scss'

const PostCard = ({ avatar, author, description, timestamp, image }) => {
  return (
    <Paper className={s.cardWrapper}>
      <Stack direction="row" position="absolute" top="10px" right="10px">
        <ActionIconButton icon="dots" onClick={() => console.log('clicked')} />
        <ActionIconButton icon="close" onClick={() => console.log('clicked')} />
      </Stack>
      <PostHeader
        description={description}
        timestamp={timestamp}
        avatar={avatar}
        author={author}
      />
      {image && (
        <CardMedia sx={{ height: '100%' }} component="img" src={image} />
      )}
      <PostFooter
        sharesQuantity={4}
        commentsQuantity={0}
        names={['John', 'Jane', 'Jack']}
      />
    </Paper>
  )
}

PostCard.propTypes = {
  avatar: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  timestamp: PropTypes.string,
}

PostCard.displayName = 'PostCard'

export default PostCard
