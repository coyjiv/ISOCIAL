import Posts from '../views/Profile/tabs/Posts'
// import About from '../views/Profile/tabs/About'
import Friends from '../views/Profile/tabs/Friends'
// import Photos from '../views/Profile/tabs/Photos'
// import Videos from "../views/Profile/tabs/Videos";

export const profileTabs = [
  {
    id: 1,
    label: 'Posts',
    path: '/profile/posts',
    component: Posts,
  },
  // {
  //   id: 2,
  //   label: 'About',
  //   path: '/profile/about',
  //   component: About,
  // },
  {
    id: 2,
    label: 'Friends',
    path: '/profile/friends',
    component: Friends,
  },
  // {
  //   id: 3,
  //   label: 'Photos',
  //   path: '/profile/photos',
  //   component: Photos,
  // },
  // {
  //     id: 5,
  //     label: 'Videos',
  //     path: '/profile/videos',
  //     component: Videos,
  // },
]
