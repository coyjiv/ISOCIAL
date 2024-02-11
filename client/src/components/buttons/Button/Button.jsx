import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'
import Box from '@mui/material/Box'

const Button = ({ variant, children, type, size, fullWidth, boxProps, ...props }) => {
  return (
    <Box {...boxProps} width={fullWidth && '100%'}>
      <MuiButton
        {...props}
        variant={variant}
        type={type}
        size={size}
        fullWidth={fullWidth}
      >
        {children}
      </MuiButton>
    </Box>
  )
}

Button.displayName = 'Button'

Button.propTypes = {
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  children: PropTypes.any,
  boxProps: PropTypes.object,
}

Button.defaultProps = {
  variant: 'contained',
  type: 'button',
  size: 'medium',
}
export default Button
