import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const MainContentWrapper = styled(Stack)({
  width: '100%',
  height: '100%',
  padding: '20px',
  gap: '25px',
  overflow: 'auto',
  '@media (max-width: 768px)': {
    display: 'none',
  },
})
