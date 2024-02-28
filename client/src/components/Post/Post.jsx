
//libs
import moment from "moment";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
//styles
import styles from './styles.module.scss'
//images
import action from './icons/action.svg'
import heart from './icons/heart.svg'
import comment from './icons/comment.svg'
// import CommentIcon from './icons/commentIcon.svg?react'
// import likeIcon from './icons/likeIcon.svg'

import { IoSend } from "react-icons/io5";
import { TextareaAutosize, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useToggleLikeMutation } from "../../store/services/postService";
import { useHover } from "usehooks-ts";
import RecentComments from "./RecentComments";
import Like from "../Like";
import { useCreateCommentMutation } from "../../store/services/commentService";
import { Form, Formik, Field } from "formik";
import Spinner from "../Spinner";
import PhotosCollage from "./PhotosCollage";
import CreateEditPostModal from "../modals/CreatePost";
import { placeholderAvatar } from "../../data/placeholders";
import { useDeletePostMutation } from "../../store/services/postService";
import ConfirmModal from "../modals/ConfirmModal";
import CommentPostIcon from "../CommentPostIcon";
import SavePostIcon from "../SavePostIcon";
import SharePostIcon from "../SharePostIcon";


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
}) => {
    const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount);
    const [optimisticLiked, setOptimisticLiked] = useState(liked);
    const [optimisticCommentsCount, setOptimisticCommentsCount] = useState(commentsCount);
    const [optimisticRecentComments, setOptimisticRecentComments] = useState(recentComments);
    const [optimisticEditedData, setOptimisticEditedData] = useState(textContent);
    const [optimisticFavourite, setOptimisticFavourite] = useState(favourite);
    const [editedModal, setEditedModal] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const isRepost = !!originalPostId;


    const [toggleLike] = useToggleLikeMutation();
    const [deletePost] = useDeletePostMutation();
    const loggedUser = localStorage.getItem('userId');
    const isPostOwner = parseInt(loggedUser) === authorId;

    const [isModalAction, setIsModalAction] = useState(null);

    const handleLikePost = async () => {
        setOptimisticLiked(!optimisticLiked);
        setOptimisticLikesCount(optimisticLiked ? optimisticLikesCount - 1 : optimisticLikesCount + 1);
        toggleLike({ entityId: postId, entityType: 'POST' })
    }

    const handleDeletePost = async () => {
        deletePost(postId).then(() => {
            removePost()
        });
    }

    const [postComment] = useCreateCommentMutation();

    const handleComment = async (values) => {
        await postComment({ postId, text: values.text }).then((res) => {
            setOptimisticCommentsCount(optimisticCommentsCount + 1);
            setOptimisticRecentComments([...optimisticRecentComments, res.data]);
        })
    }

    const handleDeleteComment = async (res, commentId) => {
        setOptimisticCommentsCount(optimisticCommentsCount - 1);
        setOptimisticRecentComments(optimisticRecentComments.filter(c => c.id !== commentId));
    }

    const handlePostMenu = (event) => {
        setIsModalAction(event.currentTarget);
    };

    const handlePostMenuClose = () => {
        setIsModalAction(null);
    };

    const handleCloseEditModal = () => {
        setEditedModal(false);
    }

    const handleSuccessEdit = (data) => {
        setOptimisticEditedData(data.textContent);
    }

    const openModal = Boolean(isModalAction);

    const handleOpenComments = () => { };


    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.user}>
                        <Link to={`/profile/${authorId}`}>
                            <img src={avatarUrl ?? placeholderAvatar('', username.split(' ')[0], username.split(' ')[1])} alt="" className={styles.userImage} />
                        </Link>
                        <div className={styles.userData}>
                            <Link to={`/profile/${authorId}`}>
                                <p className={styles.username}>{username}</p>
                            </Link>
                            <p className={styles.creationDate}>
                                {moment(creationDate).format('DD MMMM YYYY [р.]')}
                            </p>
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
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    setEditedModal(true);
                                    handlePostMenuClose();
                                }}>Edit</MenuItem>
                                <MenuItem onClick={() => {
                                    setDeleteDialog(true);
                                    handlePostMenuClose();
                                }}>Delete</MenuItem>
                            </Menu>
                        </>)

                    }
                </header>
                <div className={styles.content}>
                    {!!optimisticEditedData && <p className={styles.textContent}>{optimisticEditedData}</p>}
                    {!!images.length &&
                        <PhotosCollage images={[...images]} />
                    }
                </div>
                <div className={styles.stats}>
                    <div className={styles.likes}>
                        <img src={heart} alt="icon" />
                        <p>{optimisticLikesCount}</p>
                    </div>
                    <div className={styles.commentsCount}>
                        <span>{optimisticCommentsCount}</span> <img src={comment} alt="comment icon" />
                    </div>
                </div>
                <PostActionButtons handleLikePost={handleLikePost} optimisticLiked={optimisticLiked} optimisticFavourite={optimisticFavourite} />

                <footer className={styles.footer}>
                    {optimisticRecentComments && optimisticRecentComments.length > 0 && <RecentComments onCommentChange={() => console.log('on comment change')} onCommentDelete={handleDeleteComment} comments={optimisticRecentComments} />}
                    <PostCommentInput handleComment={handleComment} />
                </footer>
            </div>
            <ConfirmModal open={deleteDialog} onClose={() => setDeleteDialog(false)} onConfirm={handleDeletePost} title={'Delete the post?'} message={'Are you sure that you want to delete the post?'} confirmButtonText={'Yes'} cancelButtonText={'No'} />
            <CreateEditPostModal type="edit" onClose={handleCloseEditModal} open={editedModal} onSuccess={handleSuccessEdit} postData={{ id: postId, textContent }} />
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
}

export default Post;


const PostActionButtons = ({ handleLikePost, handleOpenComments, optimisticLiked, optimisticFavourite, commentPanelOpen }) => {
    const likesRef = useRef(null)
    const commentRef = useRef(null)
    const shareRef = useRef(null)
    const saveRef = useRef(null)

    const isLikesHover = useHover(likesRef)
    const isCommentHover = useHover(commentRef)
    const isShareHover = useHover(shareRef)
    const isSaveHover = useHover(saveRef)

    return (
        <div className={styles.reactions}>
            <div ref={likesRef} className={styles.reaction} onClick={() => handleLikePost()}>
                <Like liked={optimisticLiked} hovered={isLikesHover} />
                <span>Like</span>
            </div>
            <div ref={commentRef} className={styles.reaction} onClick={handleOpenComments}>
                <CommentPostIcon hovered={isCommentHover} clicked={commentPanelOpen} />
                <span>Comments</span>
            </div>
            <div ref={shareRef} className={styles.reaction}>
                <SharePostIcon shared={false} hovered={isShareHover} />
                <span>Share</span>
            </div>
            <div ref={saveRef} className={styles.reaction}>
                <SavePostIcon favorite={optimisticFavourite} hovered={isSaveHover} />
                <span>Save</span>
            </div>
        </div>
    )
}

const PostCommentInput = ({ handleComment }) => {

    const validateComment = (value) => {
        let error;
        if (!value) {
            error = 'You can\'t create an empty comment';
        } else if (value.length > 280) {
            error = 'Comment is too long';
        }
        return error;
    }

    return (
        <Formik
            initialValues={{ text: '' }}
            onSubmit={async (values, { resetForm }) => {
                handleComment(values);
                resetForm();
            }}
            validateOnMount
            validateOnBlur
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <div className={styles.inputCommentWrapper}>
                        <button type="submit" disabled={!isValid} className={styles.inputSendBtn}>{isSubmitting ? <Spinner /> : <IoSend />}</button>
                        <Field validate={validateComment} type="text" name="text" placeholder="Comment..." className={styles.commentInput} as={TextareaAutosize} />
                    </div>
                </Form>
            )}
        </Formik>
    )
}