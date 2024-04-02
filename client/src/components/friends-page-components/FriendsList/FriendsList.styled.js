import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const FriendsListWrapper = styled(Stack)({
  width: '100%',
})

export const ExpandedWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '12px',
  transition: 'all 0.45s ease',
  height: '100%',
  overflowY: 'auto',
  paddingBottom: '12px',
}))
