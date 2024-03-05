import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { BiNotification } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";

export const iconsMap = (size) => ({
  dots: <BiDotsHorizontalRounded size={size} color="inherit" />,
  close: <CgClose size={size} color="inherit" />,
  like: <BiLike size={size} color="inherit" />,
  comment: <FaRegComment size={size} color="inherit" />,
  share: <TbShare3 size={size} color="inherit" />,
  settings: <FaGear size={size} color="inherit" />,
  notification: <BiNotification size={size} color="inherit" />,
  arrowLeft: <FaArrowLeft size={size} color="inherit" />,
  arrowRight: <FaArrowRight size={size} color="inherit" />,
  search: <FiSearch size={size} color="inherit" />,
  clock: <IoMdTime size={size} color="inherit" />,
});
