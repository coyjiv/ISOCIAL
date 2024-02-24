import { BsPeopleFill } from "react-icons/bs";
import { RiUserSharedFill } from "react-icons/ri";
import { PATH } from "../../../utils/constants";

export const sidebarItemsMap = [
  { title: "Home", icon: <BsPeopleFill />, to: PATH.FRIENDS },
  { title: "Friend Requests", icon: <RiUserSharedFill />, to: PATH.FRIENDS_REQUESTS },
  { title: "All friends", icon: <BsPeopleFill />, to: PATH.FRIENDS_ALL },
];
