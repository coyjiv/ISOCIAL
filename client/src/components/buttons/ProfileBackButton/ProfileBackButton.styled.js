import { Box, styled } from '@mui/material'
import { MQ_MUI } from '../../../utils/constants'

export const ButtonBase = styled(Box)(({ theme }) => ({
  // margin: '0 24px',
  flexDirection: 'row',
  padding: '12px 24px',
  alignItems: 'center',
  gap: '10px',
  display: 'flex',
  cursor: 'pointer',
  background: 'none',
	outline: 'none',
	[theme.breakpoints.down(MQ_MUI.MOBILE)]: {
    padding: '12px 16px',
  },
}))
