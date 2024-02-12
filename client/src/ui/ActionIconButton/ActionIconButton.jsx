import PropTypes from 'prop-types'
import { Typography, useTheme } from '@mui/material'
import { BiSolidLike } from 'react-icons/bi'
import { useState } from 'react'

import { iconsMap } from './ActionIconButton.utils'
import { ButtonBase } from './ActionIconButton.styled'

const ActionIconButton = ({
  variant,
  icon,
  color,
  filledOnPress,
  children,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const { palette } = useTheme()
  const defaultColor = palette.background.colorAction ?? 'black'
  const hasFilledColor = isPressed && filledOnPress

  let buttonColor = color ? color : defaultColor

  if (hasFilledColor) {
    buttonColor = palette.primaryButtonBackground
  }

  const handleClick = () => {
    setIsPressed(!isPressed)
    onClick?.()
  }

  return (
    <ButtonBase variant={variant} color={buttonColor} onClick={handleClick}>
      {hasFilledColor ? (
        <BiSolidLike size="20" color="inherit" />
      ) : (
        iconsMap[icon]
      )}
      {variant === 'text' && (
        <Typography color={hasFilledColor && buttonColor}>
          {children}
        </Typography>
      )}
    </ButtonBase>
  )
}

ActionIconButton.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.oneOf(['icon', 'text']).isRequired,
  icon: PropTypes.oneOf(['dots', 'close', 'like', 'comment', 'share']),
  filledOnPress: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

ActionIconButton.defaultProps = {
  variant: 'icon',
  icon: 'dots',
}

ActionIconButton.displayName = 'ActionIconButton'

export default ActionIconButton
