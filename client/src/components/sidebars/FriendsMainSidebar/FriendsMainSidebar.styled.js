import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const SidebarWrapper = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'hidden', // Prevent `hidden` from being passed to the DOM element as an attribute
})(({ theme, hidden }) => ({
  minWidth: '360px',
  height: '100%',
  backgroundColor: theme.palette?.white,
  boxShadow:
    '5px 0 5px -5px rgba(0, 0, 0, 0.2), -2px 0 2px -2px rgba(0, 0, 0, 0.2)',
  padding: '8px',
  [theme.breakpoints.down(660)]: {
    minWidth: '100%',
  },
  '@media (max-width: 800px)': {
    display: hidden ? 'none' : 'block',
  },
}))

export const SidebarHeaderWrapper = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 8px',
  '@media (max-width: 800px)': {
    display: 'none',
  },
})
