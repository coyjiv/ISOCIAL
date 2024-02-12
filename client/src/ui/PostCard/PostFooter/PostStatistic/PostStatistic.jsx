import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'

const PostStatistic = ({ names, commentsQuantity, sharesQuantity }) => {
  const isShowNames = names?.length <= 2
  const isShowNamesQuantity = names?.length >= 3

  return (
    <Stack direction="row" gap="10px">
      <Stack flex="1">
        {isShowNamesQuantity && (
          <Typography fontSize="15px">
            {`${names[0]}, ${names[1]}`} and {names.length - 2} other
          </Typography>
        )}
        {isShowNames && <Typography fontSize="15px">{names[0]}</Typography>}
      </Stack>
      {commentsQuantity > 0 && (
        <Typography fontSize="15px">{commentsQuantity} comments</Typography>
      )}
      {sharesQuantity > 0 && (
        <Typography fontSize="15px"> {sharesQuantity} shares</Typography>
      )}
    </Stack>
  )
}

PostStatistic.propTypes = {
  names: PropTypes.array,
  commentsQuantity: PropTypes.number,
  sharesQuantity: PropTypes.number,
}

PostStatistic.displayName = 'PostStatistic'

export default PostStatistic
