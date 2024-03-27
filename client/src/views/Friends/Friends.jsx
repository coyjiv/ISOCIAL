import { withLayout } from '../../hooks/withLayout'
import { FriendsMainSidebar } from '../../components/sidebars'
import { FriendsMainContent } from './FriendsMainContent'
import { FriendsPageWrapper } from './Friends.styled'

import { useTheme } from '@mui/material/styles';
import { Drawer, IconButton, Box, Toolbar, AppBar, Typography, useScrollTrigger, Slide } from '@mui/material'
import { FaUserFriends } from "react-icons/fa";
import { useState } from 'react'
import PropTypes from 'prop-types'


const FriendsPage = () => {

  return (
    <FriendsPageWrapper>
      <FriendsMobileDrawer />
      <FriendsMainSidebar hidden={true} />
      <FriendsMainContent hidden={true} />
    </FriendsPageWrapper>
  )
}

const Friends = withLayout(FriendsPage)

export default Friends


const FriendsMobileDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: 'flex', '@media(min-width:800px)': { display: 'none' }, width: '100%', flexDirection: 'column' }}>
      <HideOnScroll>
        <AppBar position="static" sx={{ height: '56px', padding: 0, zIndex: 9, background: theme.palette.grey[100], '@media(min-width:800px)': { display: 'none' } }} open={open}>
          <Toolbar sx={{ height: '56px', '@media(min-width: 600px)': { minHeight: '56px' } }}>
            <IconButton
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, borderRadius: '50%', background: theme.palette.grey[300], transition: "background 0.3s ease", ":hover": { background: theme.palette.grey[600] }, ':focus-visible': { background: theme.palette.grey[600] } }}
            >
              <FaUserFriends />
            </IconButton>
            <Typography onClick={toggleDrawer(true)} variant="h6" fontWeight={600} noWrap sx={{ color: theme.palette.text.base, cursor: 'pointer' }}>
              Friends
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer open={open} sx={{ translate: '0 40px' }} onClose={toggleDrawer(false)}>
        <FriendsMainSidebar />
      </Drawer>
      <FriendsMainContent />
    </Box>
  )
}


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};