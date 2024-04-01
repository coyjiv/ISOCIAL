import { withLayout } from "../../hooks/withLayout";
import { withWebsocket } from "../../hooks/withWebsocket.jsx";

import { useState } from "react";

import { ChatModal } from "./ChatModal";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import "./Chat.scss";
import ChatView from "./ChatView/index.jsx";

const ChatContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div className="chats">
      <ChatModal
        open={isOpen}
        handleClose={handleClose}
        modalText="Select Friend"
      />
      <ChatView />
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

const Chats = withLayout(withWebsocket(ChatContainer));
export default Chats;
