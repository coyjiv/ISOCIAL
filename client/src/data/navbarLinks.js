import {
  BsHouseDoorFill,
  BsHouseDoor,
  BsPeople,
  BsPeopleFill,
} from 'react-icons/bs'
// import { HiOutlineUserGroup, HiUserGroup  } from "react-icons/hi2";
// import { MdOutlineOndemandVideo, MdOndemandVideo } from "react-icons/md";

export const navbarLinks = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    activeIcon: BsHouseDoorFill,
    defaultIcon: BsHouseDoor,
  },
  {
    id: 2,
    label: 'Friends',
    path: '/friends',
    activeIcon: BsPeopleFill,
    defaultIcon: BsPeople,
  },
  // {
  //     id: 3,
  //     label: 'Videos',
  //     path: '/watch',
  //     activeIcon: MdOndemandVideo,
  //     defaultIcon: MdOutlineOndemandVideo,
  // },
  // {
  //     id: 4,
  //     label: 'Groups',
  //     path: '/groups',
  //     activeIcon: HiUserGroup,
  //     defaultIcon: HiOutlineUserGroup,
  // },
]
