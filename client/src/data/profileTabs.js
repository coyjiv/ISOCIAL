import Posts from "../views/Profile/tabs/Posts";
import About from "../views/Profile/tabs/About";
import Friends from "../views/Profile/tabs/Friends";
import Photos from "../views/Profile/tabs/Photos";
import Videos from "../views/Profile/tabs/Videos";

export const profileTabs = [
    {
        id: 1,
        title: 'Posts',
        path: '/profile/posts',
        component: Posts,
    },
    {
        id: 2,
        title: 'About',
        path: '/profile/about',
        component: About,
    },
    {
        id: 3,
        title: 'Friends',
        path: '/profile/friends',
        component: Friends,
    },
    {
        id: 4,
        title: 'Photos',
        path: '/profile/photos',
        component: Photos,
    },
    {
        id: 5,
        title: 'Videos',
        path: '/profile/videos',
        component: Videos,
    },
];