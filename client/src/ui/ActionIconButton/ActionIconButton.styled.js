import styled from '@emotion/styled'

const buttonIcon = {
  icon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
  },

  text: {
    gap: '10px',
    padding: '6px 0 6px 0',
    width: '100%',
    borderRadius: '4px',
  },
}

export const ButtonBase = styled.button(({ color, variant, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: 'none',
  color,
  transition: 'background-color 0.25s ease',
  ...buttonIcon[variant],
  '&:hover': {
    backgroundColor: theme.palette.background.greyHover,
  },
}))
