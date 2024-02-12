import styled from '@emotion/styled'

export const TextButtonBase = styled.button(({ theme }) => ({
  padding: '0',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: 'none',
  color: theme.palette.primaryButtonBackground,
  transition: 'all 0.25s ease',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))
