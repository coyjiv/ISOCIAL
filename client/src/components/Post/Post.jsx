//libs
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
//styles
import styles from "./styles.module.scss";
//images
import action from "./icons/action.svg";
import heart from "./icons/heart.svg";
import comment from "./icons/comment.svg";
// import CommentIcon from './icons/commentIcon.svg?react'
// import likeIcon from './icons/likeIcon.svg'

import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useToggleLikeMutation,
  useToggleSaveMutation,
} from "../../store/services/postService";
import RecentComments from "./RecentComments";
import { useCreateCommentMutation } from "../../store/services/commentService";
import PhotosCollage from "./PhotosCollage";
import { useDeletePostMutation } from "../../store/services/postService";
import ConfirmModal from "../modals/ConfirmModal";
import { CommentsModal } from "./CommentsModal";
import { PostCommentInput } from "./PostCommentInput";
import { PostActionButtons } from "./PostActionButtons";
import LikedUsersTooltip from "./LikedUsersTooltip";
import { LikedUsers } from "./LikedUsers";
import CreateEditRepostPostModal from "../modals/CreatePost";

const Post = ({
  postId,
  authorId,
  avatarUrl,
  username,
  creationDate,
  textContent,
  images,
  likesCount,
  commentsCount,
  liked,
  recentComments,
  removePost,
  favourite,
  originalPostId,
  recentLikedUsers,
  originalPost,
  addNewPost,
}) => {
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount);
  const [optimisticLiked, setOptimisticLiked] = useState(liked);
  const [optimisticCommentsCount, setOptimisticCommentsCount] =
    useState(commentsCount);
  const [optimisticRecentComments, setOptimisticRecentComments] =
    useState(recentComments);
  const [optimisticEditedData, setOptimisticEditedData] = useState(textContent);
  const [optimisticFavourite, setOptimisticFavourite] = useState(favourite);
  const [editedModal, setEditedModal] = useState(false);
  const [repostModal, setRepostModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [commentPanelOpen, setCommentPanelOpen] = useState(false);

  const isRepost = !!originalPostId;

  const [toggleLike] = useToggleLikeMutation();
  const [deletePost] = useDeletePostMutation();
  const [toggleSavePost] = useToggleSaveMutation();
  const [postComment] = useCreateCommentMutation();

  const loggedUser = localStorage.getItem("userId");
  const isPostOwner = parseInt(loggedUser) === authorId;

  const [isModalAction, setIsModalAction] = useState(null);

  const handleLikePost = async () => {
    setOptimisticLiked(!optimisticLiked);
    setOptimisticLikesCount(
      optimisticLiked ? optimisticLikesCount - 1 : optimisticLikesCount + 1
    );
    toggleLike({ entityId: postId, entityType: "POST" });
  };

  const handleDeletePost = async () => {
    deletePost(postId).then(() => {
      removePost();
    });
  };

  const handleComment = async (values) => {
    await postComment({ postId, text: values.text }).then((res) => {
      setOptimisticCommentsCount(optimisticCommentsCount + 1);
      setOptimisticRecentComments([...optimisticRecentComments, res.data]);
    });
  };

  const handleDeleteComment = async (res, commentId) => {
    setOptimisticCommentsCount(optimisticCommentsCount - 1);
    setOptimisticRecentComments(
      optimisticRecentComments.filter((c) => c.id !== commentId)
    );
  };

  const handlePostMenu = (event) => {
    setIsModalAction(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setIsModalAction(null);
  };

  const handleCloseEditModal = () => {
    setEditedModal(false);
  };

  const handleCloseRepostModal = () => {
    setRepostModal(false);
  };

  const handleOpenRepostModal = () => {
    setRepostModal(true);
  };

  const handleSuccessEdit = (data) => {
    setOptimisticEditedData(data.textContent);
  };

  const handleSuccessRepost = (data) => {
    addNewPost(data);
  };

  const openModal = Boolean(isModalAction);

  const handleOpenComments = () => {
    setCommentPanelOpen(true);
  };

  const handleSavePost = () => {
    const oldFavourite = optimisticFavourite;
    setOptimisticFavourite(!oldFavourite);
    toggleSavePost(postId)
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.user}>
            <Link to={`/profile/${authorId}`}>
              <Avatar
                src={avatarUrl}
                alt={username + "'s " + 'avatar'}
                className={styles.userImage}
              />
            </Link>
            <div className={styles.userData}>
              <Link to={`/profile/${authorId}`}>
                <p className={styles.username}>{username}</p>
              </Link>
              <time className={styles.creationDate}>
                {moment(creationDate).format("DD MMMM YYYY")}
              </time>
            </div>
          </div>
          {isPostOwner && (
            <>
              <div className={styles.actions} onClick={handlePostMenu}>
                <img src={action} alt="action btn" />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={isModalAction}
                open={openModal}
                onClose={handlePostMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setEditedModal(true);
                    handlePostMenuClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDeleteDialog(true);
                    handlePostMenuClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </header>
        {isRepost && (
          <div className={styles.repostInfo}>
            <p className={styles.repostText}>
              Reposted from{" "}
              <Link to={`/profile/${originalPost.authorId}`}>
                {originalPost.authorFullName}
              </Link>{" "}
              | <Link to={`/post/${originalPostId}`}>View original</Link>
            </p>
          </div>
        )}
        <div className={styles.content}>
          {!!optimisticEditedData && (
            <p className={styles.textContent}>{optimisticEditedData}</p>
          )}
          {!!images.length && <PhotosCollage images={images} />}
          {isRepost && !!originalPost?.textContent && (
            <>
              <Divider style={{ margin: "35px" }} />
              <p className={styles.textContent}>{originalPost?.textContent}</p>
              {isRepost && !!originalPost?.attachments?.length && (
                <PhotosCollage images={originalPost?.attachments} />
              )}
            </>
          )}
        </div>
        <div className={styles.stats}>
          <LikedUsersTooltip
            content={
              <LikedUsers
                likesCount={optimisticLikesCount}
                recentLikedUsers={recentLikedUsers}
              />
            }
          >
            <div className={styles.likes}>
              <img src={heart} alt="icon" />
              <p>{optimisticLikesCount}</p>
            </div>
          </LikedUsersTooltip>
          <div className={styles.commentsCount} onClick={handleOpenComments}>
            <span>{optimisticCommentsCount}</span>{" "}
            <img src={comment} alt="comment icon" />
          </div>
        </div>
        <PostActionButtons
          isRepost={isRepost}
          handleLikePost={handleLikePost}
          optimisticLiked={optimisticLiked}
          optimisticFavourite={optimisticFavourite}
          handleSavePost={handleSavePost}
          handleOpenComments={handleOpenComments}
          commentPanelOpen={commentPanelOpen}
          handleOpenShareModal={handleOpenRepostModal}
        />

        <footer className={styles.footer}>
          {optimisticRecentComments && optimisticRecentComments.length > 0 && (
            <RecentComments
              onCommentDelete={handleDeleteComment}
              comments={optimisticRecentComments}
            />
          )}
          <PostCommentInput handleComment={handleComment} />
        </footer>
      </div>
      <ConfirmModal
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDeletePost}
        title={"Delete the post?"}
        message={"Are you sure that you want to delete the post?"}
        confirmButtonText={"Yes"}
        cancelButtonText={"No"}
      />
      <CreateEditRepostPostModal
        type="edit"
        title="Edit the post"
        onClose={handleCloseEditModal}
        open={editedModal}
        onSuccess={handleSuccessEdit}
        postData={{ id: postId, textContent }}
      />
      <CreateEditRepostPostModal
        type="repost"
        title="Share a post"
        onClose={handleCloseRepostModal}
        open={repostModal}
        onSuccess={handleSuccessRepost}
        postData={{ id: postId, textContent }}
      />
      <CommentsModal
        open={commentPanelOpen}
        onClose={() => setCommentPanelOpen(false)}
        postId={postId}
      />
    </>
  );
};

Post.propTypes = {
  postId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  liked: PropTypes.bool.isRequired,
  recentComments: PropTypes.array.isRequired,
  removePost: PropTypes.func.isRequired,
  originalPostId: PropTypes.number,
  favourite: PropTypes.bool,
  recentLikedUsers: PropTypes.array,
  originalPost: PropTypes.object,
  addNewPost: PropTypes.func,
};

export default Post;
