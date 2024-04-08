import { useEffect, useState } from "react";
import "./Chat.scss";
import { useParams, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { withLayout } from "../../hooks/withLayout";
import { useSelector, useDispatch } from "react-redux";
import ChatView from "./ChatView";
import { ChatModal } from "./ChatModal";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { fetchChatInfo } from "../../store/actions/chat";

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: paramsId } = useParams();
  const selectedChat = useSelector((state) => state.chat.selectedChat);




  if (!paramsId) {
    navigate("/chats");
  }

  // useEffect(() => {
  //   if (!isLoading && !isSuccess) {
  //     navigate("/chats");
  //   }
  // }, [isLoading, isSuccess, navigate]);

  useEffect(() => {
    if (paramsId && !selectedChat && selectedChat?.id !== paramsId) {
      dispatch(fetchChatInfo({ chatId: paramsId }));
    }
  }, [paramsId, dispatch, selectedChat]);

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
      <ChatView id={paramsId} />
      {selectedChat?.id === paramsId && <Fab
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
        color="primary"
        aria-label="edit"
      >
        <EditIcon />
      </Fab>}
    </div>
  );
};

ChatPage.propTypes = {
  id: PropTypes.string,
};

export const Chat = withLayout(ChatPage);
