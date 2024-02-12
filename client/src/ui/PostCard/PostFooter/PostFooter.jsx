import PropTypes from 'prop-types'
import { Divider } from '@mui/material'

import { ActionIconButton } from '../../../ui'
import { PostStatistic } from './PostStatistic'
import { PostActionsWrapper, PostFooterWrapper } from './PostFooter.styled.js'

const PostFooter = ({ names, commentsQuantity, sharesQuantity }) => {
  return (
    <PostFooterWrapper>
      <PostStatistic
        names={names}
        commentsQuantity={commentsQuantity}
        sharesQuantity={sharesQuantity}
      />
      <Divider />
      <PostActionsWrapper gap={2} width="100%">
        <ActionIconButton
          variant="text"
          icon="like"
          filledOnPress
          onClick={() => console.log('clicked')}
        >
          Like
        </ActionIconButton>
        <ActionIconButton
          variant="text"
          icon="comment"
          onClick={() => console.log('clicked')}
        >
          Comment
        </ActionIconButton>
        <ActionIconButton
          variant="text"
          icon="share"
          onClick={() => console.log('clicked')}
        >
          Share
        </ActionIconButton>
      </PostActionsWrapper>
    </PostFooterWrapper>
  )
}

PostFooter.propTypes = {
  names: PropTypes.array,
  commentsQuantity: PropTypes.number,
  sharesQuantity: PropTypes.number,
}

PostFooter.displayName = 'PostFooter'

export default PostFooter
