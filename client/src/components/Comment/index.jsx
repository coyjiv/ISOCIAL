/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react'
import { useToggleLikeMutation } from '../../store/services/postService'
import { Avatar } from '@mui/material'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './comment.module.scss'
import { placeholderAvatar } from '../../data/placeholders'
import { useGetProfileByIdQuery } from '../../store/services/profileService'
import { useDeleteCommentMutation } from '../../store/services/commentService';
import { useHover } from 'usehooks-ts'
import { Menu, MenuItem } from '@mui/material';
import Like from '../Like'
import ConfirmModal from '../modals/ConfirmModal';

const Comment = ({
    id,
    authorAvatar,
    authorFullName,
    text,
    likesCount,
    commenterId,
    recentLikedUsers,
    authorPremiumNickname,
    authorPremiumEmoji,
    creationDate,
    edited,
    liked,
    authorPremium,
    onCommentDelete,
                     onLike
}) => {
    //like ref
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    //comment actions
    const [actionBtn, setActionBtn] = useState(null);
    const [deleteCommentDialog, setDeleteCommentDialog] = useState(false)
    const handleActionClick = (event) => {
        setActionBtn(event.currentTarget);
    };

    const { data: currentUser } = useGetProfileByIdQuery(localStorage.getItem('userId'))
    const [optimisticLiked, setOptimisticLiked] = useState(liked);
    const [optimisticLikesCount, setOptimisticLikesCount] = useState(likesCount);

    const [toggleLike] = useToggleLikeMutation();
    const [deleteComment] = useDeleteCommentMutation()

    const handleLikeComment = async () => {
        setOptimisticLiked(!optimisticLiked)
        setOptimisticLikesCount(optimisticLiked ? optimisticLikesCount - 1 : optimisticLikesCount + 1)
        toggleLike({ entityId: id, entityType: 'COMMENT' })
        onLike(id)
    }

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId).then((res) => {
            console.log(res, res.status);
            onCommentDelete(res, commentId);
            setDeleteCommentDialog(false)
        })
    }

    const isCommentOwner = currentUser?.id === commenterId

    const username = authorPremium ? `${authorPremiumNickname} ${authorPremiumEmoji}` : authorFullName
    const dateInWeeks = moment(creationDate).fromNow()
    const avatarSrc = isCommentOwner
        ? currentUser?.avatarsUrl[0] ?? placeholderAvatar(currentUser?.gender, currentUser?.firstName, currentUser?.lastName)
        : authorAvatar || placeholderAvatar('', authorFullName.split(' ')[0], authorFullName.split(' ')[1])

    return (
        <div className={styles.wrapper}>
            <Avatar src={avatarSrc} alt={`${authorFullName} avatar`} />
            <div className={styles.comment}>
                <div className={styles.commentBubble}>
                    {isCommentOwner && <button className={styles.actions} onClick={handleActionClick}><HiOutlineDotsHorizontal /></button>}
                    <p className={styles.author}>{username}</p>
                    <p className={styles.text}>{text}</p>
                    <button ref={hoverRef} className={styles.likes} onClick={handleLikeComment}>
                        <Like hovered={isHover} liked={optimisticLiked} /><p>{optimisticLikesCount}</p>
                    </button>
                    {edited && <p className={styles.edited}>Edited</p>}
                </div>
                <div className={styles.footer}>
                    <div className={styles.date}>
                        <p>{dateInWeeks}</p>
                    </div>
                </div>
            </div>
            <CommentActions anchorEl={actionBtn} setAnchorEl={setActionBtn} deleteComment={() => { setDeleteCommentDialog(true); setActionBtn(null) }} />
            <ConfirmModal open={deleteCommentDialog} onClose={() => setDeleteCommentDialog(false)} onConfirm={() => handleDeleteComment(id)} title={'Delete the comment?'} message={'Are you sure that you want to delete the comment?'} confirmButtonText={'Yes'} cancelButtonText={'No'} />
        </div>
    )
}

Comment.propTypes = {
    id: PropTypes.number,
    authorAvatar: PropTypes.string,
    authorFullName: PropTypes.string,
    text: PropTypes.string,
    likesCount: PropTypes.number,
    recentLikedUsers: PropTypes.array,
    authorPremiumNickname: PropTypes.string,
    authorPremiumEmoji: PropTypes.string,
    creationDate: PropTypes.string,
    edited: PropTypes.bool,
    liked: PropTypes.bool,
    authorPremium: PropTypes.bool,
    commenterId: PropTypes.number,
    onCommentChange: PropTypes.func,
    onCommentDelete: PropTypes.func,
    onLike: PropTypes.func
}

export default Comment

const CommentActions = ({ anchorEl, setAnchorEl, editComment, deleteComment }) => {
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Menu
            id="comment-actions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={editComment}>Edit comment</MenuItem>
            <MenuItem onClick={deleteComment}>Delete comment</MenuItem>
        </Menu>
    )
}

CommentActions.propTypes = {
    anchorEl: PropTypes.object,
    setAnchorEl: PropTypes.func,
    editComment: PropTypes.func,
    deleteComment: PropTypes.func
}
