import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';


export const sidebarMenuItems = [
  {
    id: '0',
    IconComponent: <PeopleAltOutlinedIcon fontSize="large" />,
    title: 'user',
    path: 'profile',
  },
  {
    id: '1',
    IconComponent: <PeopleAltOutlinedIcon fontSize="large" />,
    title: 'Find friends',
    path: 'friends',
  },
  {
    id: '2',
    IconComponent: <FacebookOutlinedIcon fontSize="large" />,
    title: 'Welcome',
    path: 'friends',
  },
  {
    id: '3',
    IconComponent: <UpdateOutlinedIcon fontSize="large" />,
    title: 'Memories',
    path: 'friends',
  },
  {
    id: '4',
    IconComponent: <BookmarkBorderOutlinedIcon fontSize="large" />,
    title: 'Saved',
    path: 'friends',
  },
  {
    id: '5',
    IconComponent: <GroupsOutlinedIcon fontSize="large" />,
    title: 'Groups',
    path: 'groups',
  },
  {
    id: '6',
    IconComponent: <OndemandVideoOutlinedIcon fontSize="large" />,
    title: 'Watch',
    path: 'watch												',
  },
]
