import { BsPeopleFill } from "react-icons/bs";
import { RiUserSharedFill } from "react-icons/ri";

export const sidebarItemsMap = [
  { title: "Home", icon: <BsPeopleFill />, to: "/friends" },
  { title: "Friend Requests", icon: <RiUserSharedFill />, to: "/friends/requests" },
  { title: "All friends", icon: <BsPeopleFill />, to: "/friends/all" },
];
