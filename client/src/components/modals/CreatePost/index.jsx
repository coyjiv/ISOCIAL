import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import PropTypes from 'prop-types'
import { BlueRoundedButton } from "../../buttons";
import styles from './createPost.module.scss'
import { useSessionStorage } from "usehooks-ts";

const CreatePostModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [postContent, setPostContent] = useSessionStorage('postContent', '');

  const handleChange = (event) => {
    setPostContent(event.target.value);
  };




  return (
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
      <BlueRoundedButton disabled={postContent.length < 10}>Create a post</BlueRoundedButton>
    </Dialog>
  );
}

CreatePostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default CreatePostModal
