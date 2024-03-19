import PropTypes from 'prop-types'
import { getPersonalPosts, getRecommendations, getSavedPosts } from '../../store/actions/posts'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../Post/Post'
import { PostSkeleton } from '../../views/Profile/skeletons/PostSkeleton'
import { useSelector, useDispatch } from 'react-redux'
import styles from './postsWrapper.module.scss'

const PostsWrapper = ({ type }) => {
    const [page, setPage] = useState(0)
    const dispatch = useDispatch();
    const { recommendations, saved } = useSelector(state => state.posts);

    const operatedData = type === 'saved' ? saved : type === 'recommendations' ? recommendations : recommendations;
    // const operatedSuccess = type === 'saved' ? isSuccess : type === 'recommendations' ? isSuccessRecommendations : isSuccessRecommendations;

    useEffect(() => {
        if (type === 'saved') {
            dispatch(getSavedPosts({ page }));
        } else if (type === 'recommendations') {
            dispatch(getRecommendations({ page }));
        } else {
            dispatch(getPersonalPosts({ page }));
        }
    }, [dispatch, page, type]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };
    return (
        <>
            {operatedData?.content.length === 0 && <div className={styles.noPosts}>No posts yet</div>}
            <InfiniteScroll
                dataLength={operatedData.content.length}
                next={fetchMoreData}
                hasMore={operatedData?.hasNext}
                loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
                className={styles.infiniteWrapper}
            >
                {operatedData?.content.map(post => (
                    <Post key={post.id}
                        postId={post.id}
                        authorId={post.authorId}
                        avatarUrl={post.authorAvatar}
                        username={post.authorFullName}
                        creationDate={post.creationDate}
                        textContent={post.textContent}
                        images={post.attachments}
                        likesCount={post.likesCount}
                        commentsCount={post?.commentsCount}
                        recentComments={post?.recentComments}
                        liked={post.liked}
                        removePost={() => { }}
                        favourite={post.favourite}
                        recentLikedUsers={post.recentLikedUsers}
                        originalPostId={post.originalPostId}
                        originalPost={post.originalPost}
                    />
                ))}
            </InfiniteScroll>
        </>
    )
}

PostsWrapper.propTypes = {
    type: PropTypes.string
}

export default PostsWrapper