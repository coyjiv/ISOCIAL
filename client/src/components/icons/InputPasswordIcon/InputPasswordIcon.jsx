import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

import s from './InputPasswordIcon.module.scss'

const InputPasswordIcon = ({ type, onClick }) => {
  return (
    <Box className={s.iconContainer} onClick={onClick}>
      {type === 'password' && <VisibilityOffIcon color='action' />}
      {type === 'text' && <VisibilityIcon color='action' />}
    </Box>
  )
}

InputPasswordIcon.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
}

export default InputPasswordIcon
