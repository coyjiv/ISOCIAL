import styled from '@emotion/styled'
import { Badge, Card, Menu, MenuItem } from '@mui/material'

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    minWidth: '320px',
    // minHeight: '636px',
    // translate: '-20px 10px',
    backgroundColor: `${({ theme }) => theme.palette.background.paper}`,
    color: `${({ theme }) => theme.palette.text.primary}`,
  },
}))

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  transition-property: color, filter;
  transition: 0.2s ease-in-out;

  &.clicked {
    scale: 0.9;
    filter: brightness(0.8);
  }
`

export const StyledCard = styled(Card)(({ theme }) => ({
  '&.MuiCard-root': {
    minHeight: '20px',
    minWidth: '80%',
    width: '50px',
    margin: '0px auto',
    translate: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    marginTop: '10px',
    marginBottom: '20px',
    gap: '10px',
    boxShadow: `0 2px 12px ${theme.palette.shadow2}`,
    transitionProperty: 'background-color, filter, scale',
    transition: '0.3s ease-in-out',
    '&:hover': {
      background: 'rgba(0,0,0,0.05)',
      filter: 'brightness(0.8)',
    },
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  display: 'flex',
  gap: '10px',
  fontSize: '15px',
  marginTop: '10px',
  '& > div': {
    background: 'rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px',
    borderRadius: '20px',
    '& svg': {
      fontSize: '22px',
    },
  },
}))
