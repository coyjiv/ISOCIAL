import {
  BsHouseDoorFill,
  BsHouseDoor,
  BsPeople,
  BsPeopleFill,
  BsBookmark,
  BsBookmarkFill,
} from 'react-icons/bs'
import { MainLinksIcon } from '../components/MainLinksIcon'
// import { HiOutlineUserGroup, HiUserGroup  } from "react-icons/hi2";
// import { MdOutlineOndemandVideo, MdOndemandVideo } from "react-icons/md";

export const navbarLinks = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    displayOnNavbar: true,
    activeIcon: BsHouseDoorFill,
    defaultIcon: BsHouseDoor,
    mainLinksIcon: (
      <MainLinksIcon
        url='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/3dN1QwOLden.png'
        positionX={0}
        positionY={0}
        sizeWidth={38}
        sizeHeight={38}
        width={36}
        height={36}
      />
    ),
  },
  {
    id: 2,
    label: 'Friends',
    path: '/friends',
    displayOnNavbar: true,
    activeIcon: BsPeopleFill,
    defaultIcon: BsPeople,
    mainLinksIcon: (
      <MainLinksIcon
        url="https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png"
        positionX={0}
        positionY={-304}
        sizeWidth={38}
        sizeHeight={570}
        width={36}
        height={36}
      />
    ),
  },
  {
    id: 3,
    label: 'Saved',
    mainLinksIcon: (
      <MainLinksIcon
        url='https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/MXx87JcFKzH.png'
        positionX={0}
        positionY={-190}
        sizeWidth={38}
        sizeHeight={570}
        width={36}
        height={36}
      />
    ),
    path: '/saved',
    displayOnNavbar: true,
    activeIcon: BsBookmarkFill,
    defaultIcon: BsBookmark,
  },
  {
    id: 4,
    label: 'Chats',
    mainLinksIcon: (
      <MainLinksIcon
        url="https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/ooH603KFhnx.png"
        positionX={0}
        positionY={0}
        sizeWidth={38}
        sizeHeight={222}
        width={36}
        height={36}
      />
    ),
    path: '/chats',
    displayOnNavbar: false,
    activeIcon: BsBookmarkFill,
    defaultIcon: BsBookmark,
  }
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
