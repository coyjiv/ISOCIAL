import PropTypes from 'prop-types'
import { useState } from 'react'

import { TextButtonBase } from './PostFollowButton.styled'
import { Typography } from '@mui/material'

const PostFollowButton = ({ onClick }) => {
  const [text, setText] = useState('Follow')

  const handleClick = () => {
    const btnText = text === 'Follow' ? 'Following' : 'Follow'
    setText(btnText)
    onClick?.()
  }

  return (
    <TextButtonBase onClick={handleClick}>
      <Typography color="inherit" fontWeight="500">
        {text}
      </Typography>
    </TextButtonBase>
  )
}

PostFollowButton.propTypes = {
  onClick: PropTypes.func,
}

PostFollowButton.displayName = 'PostFollowButton'

export default PostFollowButton
