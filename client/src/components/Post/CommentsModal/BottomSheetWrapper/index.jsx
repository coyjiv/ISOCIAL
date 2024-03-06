/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { AutosizeTextareaSend } from '../../../AutosizeTextareaSend'
import Comment from '../../../Comment'
import { validationScheme } from '../validationScheme'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner
    from '../../../Spinner'
import styles from '../comments.module.scss'

import 'react-spring-bottom-sheet/dist/style.css'


const BottomSheetWrapper = ({ open, comments, isLoading, postId, onModify, hasNext, fetchData, handleComment, onClose }) => {
    return (
        <BottomSheet open={open} onDismiss={onClose} className={styles.bottomSheet}>

            <h1 className={styles.bottomSheetTitle}>Comments</h1>
            <div>
                {isLoading ? <Spinner /> : comments.length > 0 ? <InfiniteScroll
                    dataLength={comments?.length ?? 0}
                    next={fetchData}
                    hasMore={hasNext}
                    loader={<Spinner />}
                    height={450}
                    className={styles.bottomSheetWrapper}
                >
                    {comments?.map((comment) => <Comment key={comment.id}
                        id={comment.id}
                        authorAvatar={comment.authorAvatar}
                        authorFullName={comment.authorFullName}
                        text={comment.text}
                        likesCount={comment.likesCount}
                        commenterId={comment.commenterId}
                        recentLikedUsers={comment.recentLikedUsers}
                        authorPremiumNickname={comment.authorPremiumNickname}
                        authorPremiumEmoji={comment.authorPremiumEmoji}
                        creationDate={comment.creationDate}
                        edited={comment.edited}
                        liked={comment.liked}
                        authorPremium={comment.authorPremium}
                        onCommentDelete={() => console.log('on comment delete')}
                    />)}
                </InfiniteScroll> : <p className={styles.noCommentsMobile}>There are no comments yet. You can fix it!</p>}
            </div>
            <div className={styles.textareaWrapper}>
                <AutosizeTextareaSend
                    validationScheme={validationScheme}
                    onSubmit={handleComment}
                    placeholder="Write a comment..."
                />
            </div>
        </BottomSheet>
    )
}

BottomSheetWrapper.propTypes = {
    open: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    postId: PropTypes.number.isRequired,
    onModify: PropTypes.func.isRequired,
    handleComment: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
}

export default BottomSheetWrapper