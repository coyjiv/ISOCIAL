import AllFriends from '../views/Profile/tabs/FriendTabs/AllFriends'
import Birthdays from '../views/Profile/tabs/FriendTabs/Birthdays'
import SameBirthplace from '../views/Profile/tabs/FriendTabs/SameBirthplace'
import SameEducation from '../views/Profile/tabs/FriendTabs/SameEducation'
import SamePlace from '../views/Profile/tabs/FriendTabs/SamePlace'
// import Subscriptions from '../views/Profile/tabs/FriendTabs/Subscriptions'

export const friendTabs = [
  {
    id: 1,
    label: 'All friends',
    path: '/profile?tab=Friends&type=All',
    component: AllFriends,
  },
  {
    id: 2,
    label: 'Birthdays',
    path: '/profile?tab=Friends&type=Birthdays',
    component: Birthdays,
  },
  {
    id: 3,
    label: 'Birthplace',
    path: '/profile/photos',
    component: SameBirthplace,
  },
  {
    id: 4,
    label: 'Education',
    path: '/profile/videos',
    component: SameEducation,
  },
  {
    id: 5,
    label: 'Location',
    path: '/profile/videos',
    component: SamePlace,
  },
  // {
  //   id: 6,
  //   label: 'Subscriptions',
  //   path: '/profile/videos',
  //   component: Subscriptions,
  // },
]
