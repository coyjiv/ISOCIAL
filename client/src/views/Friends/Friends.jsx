import { withLayout } from '../../hooks/withLayout'
import { FriendsMainSidebar } from '../../components/sidebars'
import { FriendsMainContent } from './FriendsMainContent'
import { FriendsPageWrapper } from './Friends.styled'


import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GrMenu } from "react-icons/gr";
import { useTheme } from '@mui/material/styles';
import { Drawer, IconButton, Box, ListItemIcon, ListItemButton, ListItem, List, Divider, ListItemText, Toolbar, AppBar, Typography, useScrollTrigger, Slide } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types'


const FriendsPage = () => {

  return (
    <FriendsPageWrapper>
      <FriendsMobileDrawer />
      <FriendsMainSidebar />
      <FriendsMainContent />
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
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <HideOnScroll>
        <AppBar position="static" sx={{ height: '56px', padding: 0, background: theme.palette.grey[300], '@media(min-width:768px)': { display: 'none' } }} open={open}>
          <Toolbar sx={{ height: 'auto' }}>
            <IconButton
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{}}
            >
              <GrMenu />
            </IconButton>
            <Typography variant="h6" fontWeight={600} noWrap component="div">
              Friends
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {/* {DrawerList} */}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat magni et enim nesciunt dolorum illum! Commodi molestiae necessitatibus voluptas odit quidem alias? Accusamus cupiditate rerum hic temporibus dolorum consequuntur velit.
      </Drawer>
      <p>
        yesdagag
        sdfsd
      </p>
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