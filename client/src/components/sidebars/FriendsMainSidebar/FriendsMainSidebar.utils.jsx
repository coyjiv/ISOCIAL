import { BsPeopleFill } from "react-icons/bs";
import { RiUserSharedFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";

export const sidebarItemsMap = [
  { title: "Home", icon: <BsPeopleFill />, to: "/friends" },
	{ title: "Friend Requests", icon: <RiUserSharedFill />, to: "/friends/requests" },
	{ title: 'Suggestions', icon: <RiUserAddFill />, to: '/friends/suggestions' },
	{ title: "All friends", icon: <BsPeopleFill />, to: "/friends/all" },
];
