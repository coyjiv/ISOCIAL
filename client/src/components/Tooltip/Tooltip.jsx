import { useState } from 'react'
import { ClickAwayListener, Tooltip as MuiTooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { Box } from '@mui/material';

const Tooltip = ({ className, title, arrow, children, trigger, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isHover = trigger === 'hover'

  const tooltipConfig = !isHover
    ? {
      disableHoverListener: true,
      PopperProps: {
        disablePortal: true,
      },
      open: isOpen,
      onClose: () => setIsOpen(false),
    }
    : ''

  return (
    <Box onClick={() => setIsOpen(true)} width="fit-content">
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <MuiTooltip
          title={title}
          arrow={arrow}
          className={className}
          {...props}
          {...tooltipConfig}
        >
          {children}
        </MuiTooltip>
      </ClickAwayListener>
    </Box>
  )
}

Tooltip.propTypes = {
  trigger: PropTypes.oneOf(['hover', 'click']),
  arrow: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  disableFocusListener: PropTypes.bool,
  disableTouchListener: PropTypes.bool,
  children: PropTypes.node,
}

Tooltip.defaultProps = {
  trigger: 'hover',
}

export default Tooltip
