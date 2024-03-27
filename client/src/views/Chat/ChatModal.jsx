import { Box, Modal, Typography } from "@mui/material";
import { useCreateChatMutation } from "../../store/services/chatService.js";
import { useState } from "react";
import "./Chat.scss";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 23,
  p: 4,
};

const ChatModal = ({ friends, modalText, open = false, handleClose }) => {
  const [createChat] = useCreateChatMutation();

  const [attachments, setAttachments] = useState([]);
  const [text, setText] = useState("asasasd");

  const handleCreateChat = (friend, text, attachments) => {
    createChat({ receiverId: friend.id, data: { text, attachments } });
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center", mb: 1 }}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            {modalText}
          </Typography>
          <div className="friends-wrapper">
            {friends &&
              friends.map((friend) => (
                <div className="modal-item-wrapper" key={friend.id}>
                  <button
                    className="chat-modal-button"
                    onClick={() => handleCreateChat(friend, text, attachments)}
                  >
                    <img
                      className="modal-avatar-img"
                      src={friend.avatarsUrl[0]}
                      alt="avatar"
                    />
                    {friend.firstName} {friend.lastName}
                  </button>
                </div>
              ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

ChatModal.propTypes = {
  friends: PropTypes.array.isRequired,
  modalText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { ChatModal };
