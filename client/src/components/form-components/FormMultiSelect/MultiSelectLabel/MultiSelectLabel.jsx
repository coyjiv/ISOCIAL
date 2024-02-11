import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

import Tooltip from '../../../Tooltip/Tooltip'
import s from './MultiSelectLabel.module.scss'

const MultiSelectLabel = ({ label, description, trigger }) => {
  return (
    <Stack
      flexDirection="row"
      gap="4px"
      className={s.label}
      alignItems="center"
    >
      <Typography variant="subtitle1" fontSize="11px" component="p">
        {label}
      </Typography>
      <Tooltip title={description} trigger={trigger}>
        <HelpIcon fontSize="7px" cursor="pointer" color='action'/>
      </Tooltip>
    </Stack>
  )
}

MultiSelectLabel.propTypes = {
  trigger: PropTypes.oneOf(['hover', 'click']),
  label: PropTypes.string,
  description: PropTypes.string,
}

MultiSelectLabel.displayName = 'MultiSelectLabel'

export default MultiSelectLabel
