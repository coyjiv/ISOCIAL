import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const MainContentWrapper = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'hidden',
})(({ hidden }) => ({
  width: '100%',
  height: '100%',
  padding: '20px',
  gap: '25px',
  overflow: 'auto',
  '@media (max-width: 800px)': {
    display: hidden ? 'none' : 'block',
  },
}))
