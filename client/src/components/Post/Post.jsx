/* eslint-disable no-unused-vars */
//libs
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
//styles
import styles from './styles.module.scss'
//images
import action from './icons/action.svg'
import heart from './icons/heart.svg'
import comment from './icons/comment.svg'
// import CommentIcon from './icons/commentIcon.svg?react'
// import likeIcon from './icons/likeIcon.svg'

import { IoSend } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";
import { TextareaAutosize } from "@mui/material";
import { PiShareFatBold } from "react-icons/pi";
import { API_URL, instance } from "../../api/config.js";
import { Link } from "react-router-dom";
import { useToggleLikeMutation } from "../../store/services/postService";
import { useHover } from "usehooks-ts";
import RecentComments from "./RecentComments";
import Like from "../Like";
import { useCreateCommentMutation } from "../../store/services/commentService";
import { Form, Formik, Field } from "formik";


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
}) => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    const commentsBtnRef = useRef(null)
    const isCommentsHover = useHover(commentsBtnRef)

    const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount);
    const [optimisticLiked, setOptimisticLiked] = useState(liked);
    const [optimisticCommentsCount, setOptimisticCommentsCount] = useState(commentsCount);
    const [optimisticRecentComments, setOptimisticRecentComments] = useState(recentComments);


    const [toggleLike] = useToggleLikeMutation();
    const loggedUser = localStorage.getItem('userId');
    const isPostOwner = parseInt(loggedUser) === authorId;

    const actionRef = useRef();
    const [isModalAction, setIsModalAction] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isModalAction && actionRef.current && !actionRef.current.contains(e.target)) {
                setIsModalAction(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [actionRef, isModalAction]);


    const handleLikePost = async () => {
        setOptimisticLiked(!optimisticLiked);
        setOptimisticLikesCount(optimisticLiked ? optimisticLikesCount - 1 : optimisticLikesCount + 1);
        toggleLike({ entityId: postId, entityType: 'POST' })
    }
    const handleDeletePost = async () => {
        await instance.delete(`${API_URL}/api/posts/${postId}`);
        // TODO: REMOVE FROM POSTS LIST
    }

    const [postComment] = useCreateCommentMutation();

    const handleComment = async (values) => {
        await postComment({ postId, text: values.text }).then((res) => {
            setOptimisticCommentsCount(optimisticCommentsCount + 1);
            setOptimisticRecentComments([...optimisticRecentComments, res.data]);
        })
    }

    const handleDeleteComment = async (commentId) => {
        // await deleteComment({ commentId }).then((res) => {
        //     setOptimisticCommentsCount(optimisticCommentsCount - 1);
        //     setOptimisticRecentComments(optimisticRecentComments.filter(c => c.id !== commentId));
        // })
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.user}>
                    <Link to={`/profile/${authorId}`}>
                        <img src={avatarUrl} alt="" className={styles.userImage} />
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
                {isPostOwner && <div ref={actionRef} className={styles.actions} onClick={() => setIsModalAction(true)}>
                    <img src={action} alt="action btn" />
                    {isModalAction && <div className={styles.actionModal}>
                        <span>Edit</span>
                        <span onClick={() => handleDeletePost()}>Delete</span>
                    </div>}
                </div>}
            </div>
            <div className={styles.content}>
                {!!textContent && <p className={styles.textContent}>{textContent}</p>}
                {!!images.length && (images.length === 1 ?
                    <img src={images[0]} alt="image" className={styles.image} />
                    :
                    <div className={styles.images}>
                        <div className={styles.mainImageWrapper}>
                            <img src={images[0]} alt="image" className={styles.mainImage} />
                        </div>
                        <div className={styles.rest}>
                            {images.slice(1).map((img, i) => (
                                <div className={styles.restImageWrapper} key={i}>
                                    <img src={img} alt="image" className={styles.restImage} />
                                </div>
                            ))}
                        </div>
                    </div>)
                }
            </div>
            <div className={styles.stats}>
                <div className={styles.likes}>
                    <img src={heart} alt="icon" />
                    <p>{optimisticLikesCount}</p>
                </div>
                <div className={styles.commentsCount}>
                    <span>{commentsCount}</span> <img src={comment} alt="comment icon" />
                </div>
            </div>
            <div className={styles.reactions}>
                <div ref={hoverRef} className={styles.reaction} onClick={() => handleLikePost()}>
                    <Like liked={optimisticLiked} hovered={isHover} />
                    <span>Like</span>
                </div>
                <div ref={commentsBtnRef} className={styles.reaction}>
                    <FaRegComment />
                    <span>Comments</span>
                </div>
                <div className={styles.reaction}>
                    <PiShareFatBold style={{ width: '18px', height: '18px', translate: '0 1px' }} />
                    <span>Share</span>
                </div>
            </div>

            <div className={styles.footer}>
                {recentComments && recentComments.length > 0 && <RecentComments onCommentChange={() => console.log('on comment change')} onCommentDelete={handleDeleteComment} comments={optimisticRecentComments} />}
                <Formik
                    initialValues={{ text: '' }}
                    onSubmit={async (values, { resetForm }) => {
                        handleComment(values);
                        resetForm();
                    }}
                >
                    <Form>
                        <div className={styles.inputCommentWrapper}>
                            <button type="submit" className={styles.inputSendBtn}><IoSend /></button>
                            <Field type="text" name="text" placeholder="Comment..." className={styles.commentInput} as={TextareaAutosize} />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
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
}

export default Post;
