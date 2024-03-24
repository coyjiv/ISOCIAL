import { withLayout } from '../../hooks/withLayout'
import { FriendsMainSidebar } from '../../components/sidebars'
import { FriendsMainContent } from './FriendsMainContent'
import { FriendsPageWrapper } from './Friends.styled'

import { Drawer, IconButton, ListItemIcon, ListItemButton, ListItem, List, Divider, ListItemText } from '@mui/material'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTheme } from '@mui/material/styles';
import { useState } from 'react'

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
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      sx={{
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <FaChevronRight /> : <FaChevronLeft />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}