import PropTypes from 'prop-types'
import { FaArrowLeft } from 'react-icons/fa6'
import { Typography } from '@mui/material'
import { useMediaQuery } from 'usehooks-ts'

import { MQ } from '../../../utils/constants'
import { ButtonBase } from './ProfileBackButton.styled.js'

const ProfileBackButton = ({ fullName, onClick }) => {
  const isShow = useMediaQuery(MQ.TABLET)

  if (!isShow) {
    return null
  }

  return (
    <ButtonBase onClick={onClick}>
      <FaArrowLeft size="22" color="inherit" />
      <Typography fontSize="20px">{fullName}</Typography>
    </ButtonBase>
  )
}

ProfileBackButton.propTypes = {
  fullName: PropTypes.string,
  onClick: PropTypes.func,
}

ProfileBackButton.displayName = 'ProfileBackButton'

export default ProfileBackButton
