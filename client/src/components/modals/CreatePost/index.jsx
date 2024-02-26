import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import PropTypes from 'prop-types'
import { BlueRoundedButton } from "../../buttons";
import styles from './createPost.module.scss'
import { useSessionStorage } from "usehooks-ts";
import { useCreatePostMutation } from "../../../store/services/postService";
import { CiImageOn } from "react-icons/ci";
import MemoMediaUpload from "../MediaUpload";

const CreatePostModal = (props) => {
  const { onClose, open, onSuccess } = props;
  const [mediaUploadOpen, setMediaUploadOpen] = useState(false)
  const [imageAttachments, setImageAttachments] = useState([])

  const [createPost] = useCreatePostMutation();

  const handleClose = () => {
    onClose();
  };

  const [postContent, setPostContent] = useSessionStorage('postContent', '');

  const handleListItemClick = async () => {
    createPost({ textContent: postContent, attachments: imageAttachments }).then((res) => {
      setPostContent('')
      onSuccess({
        ...res.data
      });
      onClose();
    })
  };


  const handleChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleOpenMediaUpload = () => {
    setMediaUploadOpen(true)
  }

  const handleCloseMediaUpload = () => {
    setMediaUploadOpen(false)
  }

  const addImageAttachment = (url) => {
    setImageAttachments([...imageAttachments, url])
  }


  return (
    <>
      <Dialog scroll="paper" sx={{
        '& .MuiDialog-paper': {
          width: '500px',
          textAlign: 'center',
          padding: '20px',
        }
      }} onClose={handleClose} open={open}>
        <DialogTitle fontSize={20} fontWeight={900} >Create a post</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            className={styles.textarea}
            onChange={handleChange}
            value={postContent}
            aria-label="post content text area"
            placeholder="What's on your mind?"
          />
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {imageAttachments.map((attachment, index) => <img key={index} src={attachment
          } alt="post attachment" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />)}
        </div>
        <div onClick={handleOpenMediaUpload} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px', marginLeft: '10px', cursor: 'pointer' }}><CiImageOn fontSize={30} /> <p>Add image</p></div>
        <BlueRoundedButton onClick={handleListItemClick} disabled={postContent.length < 0}>Create a post</BlueRoundedButton>
      </Dialog>
      <MemoMediaUpload customOptions={{ aspect: 1 / 1, minWidth: 800, width: 800, height: 800, minHeight: 800, x: 25, y: 25, field: 'postAttachment', callbackOnUpload: addImageAttachment, dropzoneDescription: 'Drag and drop your image' }} modalTitle="Upload an image to post" open={mediaUploadOpen} onClose={handleCloseMediaUpload} />
    </>
  );
}

CreatePostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default CreatePostModal
