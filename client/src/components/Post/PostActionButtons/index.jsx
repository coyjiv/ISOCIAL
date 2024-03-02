import SavePostIcon from "../../SavePostIcon"
import SharePostIcon from "../../SharePostIcon"
import CommentPostIcon from "../../CommentPostIcon"
import Like from "../../Like"
import { useRef } from "react"
import { useHover } from "usehooks-ts"
import PropTypes from "prop-types"
import styles from './actions.module.scss'

export const PostActionButtons = ({ handleLikePost, handleOpenComments, optimisticLiked, optimisticFavourite, commentPanelOpen, handleSavePost }) => {
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
                <span className={styles.reactionTitle}>Like</span>
            </div>
            <div ref={commentRef} className={styles.reaction} onClick={handleOpenComments}>
                <CommentPostIcon hovered={isCommentHover} clicked={commentPanelOpen} />
                <span className={styles.reactionTitle}>Comments</span>
            </div>
            <div ref={shareRef} className={styles.reaction}>
                <SharePostIcon shared={false} hovered={isShareHover} />
                <span className={styles.reactionTitle}>Share</span>
            </div>
            <div ref={saveRef} className={styles.reaction} onClick={handleSavePost}>
                <SavePostIcon saved={optimisticFavourite} hovered={isSaveHover} />
                <span className={styles.reactionTitle}>Save</span>
            </div>
        </div>
    )
}

PostActionButtons.propTypes = {
    handleLikePost: PropTypes.func.isRequired,
    handleOpenComments: PropTypes.func.isRequired,
    optimisticLiked: PropTypes.bool.isRequired,
    optimisticFavourite: PropTypes.bool.isRequired,
    commentPanelOpen: PropTypes.bool.isRequired,
    handleSavePost: PropTypes.func.isRequired,

}