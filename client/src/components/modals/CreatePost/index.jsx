import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import PropTypes from 'prop-types'
import { BlueRoundedButton } from "../../buttons";
import { useSessionStorage } from "usehooks-ts";
import { useCreatePostMutation, useEditPostMutation } from "../../../store/services/postService";
import { CiImageOn } from "react-icons/ci";
import MemoMediaUpload from "../MediaUpload";
import Attachment from "./Attachment";
import styles from './createPost.module.scss'

const CreateEditPostModal = (props) => {
  const { onClose, open, onSuccess, type = 'create', postData } = props;
  const [mediaUploadOpen, setMediaUploadOpen] = useState(false)
  const [imageAttachments, setImageAttachments] = useSessionStorage('postAttachments', []);

  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();

  const handleClose = () => {
    onClose();
  };

  const [postContent, setPostContent] = useSessionStorage('postContent', '');
  const [editPostContent, setEditPostContent] = useState(postData?.textContent || '')

  const handleListItemClick = async () => {
    if (type === 'create') {
      createPost({ textContent: postContent, attachments: imageAttachments }).then((res) => {
        setPostContent('')
        setImageAttachments([])
        onSuccess({
          ...res.data
        });
        onClose();
      })
    } else {
      editPost({ id: postData.id, textContent: editPostContent }).then((res) => {
        setPostContent('')
        setImageAttachments([])
        onSuccess({
          ...res.data
        });
        onClose();
      })
    }
  };


  const handleChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditPostContent(event.target.value);
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

  const onRemoveAttachment = (url) => {
    setImageAttachments(imageAttachments.filter(attachment => attachment !== url))
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
            onChange={type === 'create' ? handleChange : handleEditChange}
            value={type === 'create' ? postContent : editPostContent}
            aria-label="post content text area"
            placeholder="What's on your mind?"
          />
        </DialogContent>
        {type === 'create' && <>
          {imageAttachments.length > 0 && <div className={styles.attachments}>
            {imageAttachments.map((attachment, index) => <Attachment key={index} url={attachment} onRemove={onRemoveAttachment} />)}
          </div>}
          <div onClick={handleOpenMediaUpload} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px', marginLeft: '10px', cursor: 'pointer' }}><CiImageOn fontSize={30} /> <p>Add image</p></div>
        </>}
        <BlueRoundedButton onClick={handleListItemClick} disabled={!postContent && postContent.length === 0}>{type === 'create' ? 'Create' : 'Edit'} a post</BlueRoundedButton>
      </Dialog>
      {type === 'create' && <MemoMediaUpload customOptions={{ aspect: 1 / 1, minWidth: 100, width: 1000, height: 1000, minHeight: 100, x: 25, y: 25, field: 'postAttachment', callbackOnUpload: addImageAttachment, dropzoneDescription: 'Drag and drop your image' }} modalTitle="Upload an image to post" open={mediaUploadOpen} onClose={handleCloseMediaUpload} />}
    </>
  );
}

CreateEditPostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.string,
  postData: PropTypes.object
};

export default CreateEditPostModal
