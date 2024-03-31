import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

export const LogoContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  transition: 'all 0.15s ease-in-out',
}))

export const SearchIcon = styled(FiSearch)(({ open,theme }) => ({
  width: '20px',
  display: open ? 'none': 'block',
  height: '20px',
  color: theme.palette.greyColor,
  transition: 'all 0.15s ease-in-out',
}))

export const LogoHiddenContentWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  transition: 'all 0.15s ease-in-out',

}))

export const SearchWrapper = styled(Stack)(() => ({
  padding: '7px 8px 7px 0',
  flexDirection: 'row',
  gap:'8px',
  alignItems: 'center',
  position: 'relative',
  transition: 'all 0.15s ease-in-out',

}))

export const LogoLink = styled(Link)(() => ({
  transition: 'all 0.1s ease-in-out',
}))

export const SearchBase = styled.input(({ theme }) => ({
  width: '100%' ,
  height: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  backgroundColor: 'transparent',
  fontFamily: theme.typography.body1.fontFamily,
  transition: 'all 0.15s ease-in-out',
  '&::placeholder': {
    fontFamily: theme.typography.body1.fontFamily,
  },
}))

export const SearchContainer = styled(Stack)(({ open, theme }) => ({
  flexDirection: 'row',
  borderRadius: '20px',
  alignItems: 'center',
  width: '224px',
  gap: '4px',
  backgroundColor: theme.palette.background.field,
  padding: '8px',
    boxShadow: open
    ? '0 12px 12px rgba(0, 0, 0, 0.2), inset 0 0 0 0 rgba(255, 255, 255, 0.5);'
    : 'none',
}))

export const SearchMenu = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  maxHeight: '530px',
  overflow: 'hidden',
  top: '52px',
  left: '0',
  gap: '8px',
  backgroundColor: theme.palette.white,
  padding: '20px 8px 8px 8px',
  borderRadius: '0 0 8px 8px',
  transition: 'all 0.15s ease-in-out',
  boxShadow: '0 2px 0px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
}))
