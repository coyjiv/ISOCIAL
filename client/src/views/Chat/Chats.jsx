import { withLayout } from "../../hooks/withLayout";

import { useEffect, useState } from "react";

import { ChatModal } from "./ChatModal";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import "./Chat.scss";
import ChatView from "./ChatView/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedChat } from "../../store/chatSlice.js";

const ChatContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (selectedChat) {
      dispatch(clearSelectedChat())
    }
  }, []);

  return (
    <div className="chats">
      <ChatModal
        open={isOpen}
        handleClose={handleClose}
        modalText="Select Friend"
      />
      <ChatView hideCreateChat />
      <Fab
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
        color="primary"
        aria-label="edit"
      >
        <EditIcon />
      </Fab>
    </div>
  );
};

const Chats = withLayout(ChatContainer);
export default Chats;
