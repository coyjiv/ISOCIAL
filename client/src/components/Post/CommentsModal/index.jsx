import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material'
import { useCreateCommentMutation, useGetCommentsByPostQuery } from '../../../store/services/commentService';
import Spinner from '../../Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import Comment from '../../Comment';
import styles from './comments.module.scss';
import { AutosizeTextareaSend } from '../../AutosizeTextareaSend';
import { validationScheme } from './validationScheme';
import BottomSheetWrapper from './BottomSheetWrapper';

export const CommentsModal = ({ open, onClose, postId }) => {
    const [page, setPage] = useState(0)
    const { data: commentsQueryData, isLoading } = useGetCommentsByPostQuery({ id: postId, page, size: 10 });
    const { content: comments, hasNext } = commentsQueryData ?? { content: [] }
    const [commentsData, setCommentsData] = useState([])

    useEffect(() => {
        if (comments && comments.length > 0) {
            if (page === 0) {
                setCommentsData(comments);
            } else {
                const existingCommentIds = new Set(commentsData.map(post => post.id));

                const newComments = comments.filter(post => !existingCommentIds.has(post.id));

                setCommentsData([...commentsData, ...newComments]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments, page]);

    const fetchData = () => {
        setPage(page + 1);
    };

    const [postComment] = useCreateCommentMutation();
    const handleComment = (values) => {
        postComment({ postId, text: values.text });
    }

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        isMobile ? <BottomSheetWrapper open={open} comments={commentsData} fetchData={fetchData} handleComment={handleComment} hasNext={hasNext} isLoading={isLoading} onModify={() => { }} postId={postId} onClose={onClose} /> :
            <Dialog
                open={open}
                onClose={onClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                sx={{ '.MuiPaper-root': { width: '100%', minHeight: '450px' }, '.MuiDialogContent-root': { padding: 0 } }}
            >
                <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
                <DialogContent dividers={true}>
                    {isLoading ? <Spinner /> : commentsData.length > 0 ? <InfiniteScroll
                        dataLength={commentsData?.length ?? 0}
                        next={fetchData}
                        hasMore={hasNext}
                        loader={<Spinner />}
                        height={600}
                        className={styles.commentsWrapper}
                    >
                        {commentsData?.map((comment) => <Comment key={comment.id}
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
                    </InfiniteScroll>
                        :
                        <p className={styles.noComments}>There are no comments yet. You can fix it!</p>
                    }
                </DialogContent>
                <DialogActions sx={{ display: 'block' }}>
                    <AutosizeTextareaSend onSubmit={handleComment} placeholder={'Write your comment...'} validationScheme={validationScheme} />
                </DialogActions>
            </Dialog>
    )
}

CommentsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
}