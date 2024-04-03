import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'

export const CardWrapper = styled(Stack)({
  borderRadius: '8px',
  overflow: 'hidden',
  width: 'fit-content',
  height: 'fit-content',
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  '@media (max-width: 600px)': {
    width: '160px',
  },
})

export const CardAvatarWrapper = styled(Box)({
  width: '194px',
  height: '190px',
  '@media (max-width: 600px)': {
    width: '100%',
    height: '120px',
    margin: '0 auto',
  },
})

export const CardContentWrapper = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: '12px',
  backgroundColor: theme.palette.white,
}))
