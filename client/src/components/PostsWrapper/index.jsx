import PropTypes from 'prop-types'
import { useGetSavedPostsQuery, useGetRecommendationsQuery } from '../../store/services/postService'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../Post/Post'
import { PostSkeleton } from '../../views/Profile/skeletons/PostSkeleton'
import styles from './postsWrapper.module.scss'

const PostsWrapper = ({ type }) => {
    const [page, setPage] = useState(0)
    const { data: postsData, isSuccess } = useGetSavedPostsQuery({ page }, { skip: type !== 'saved' });
    const { data: recommendations, isSuccessRecommendations } = useGetRecommendationsQuery({ page }, { skip: type !== 'recommendations' })

    const operatedData = type === 'saved' ? postsData : type === 'recommendations' ? recommendations : recommendations;
    const operatedSuccess = type === 'saved' ? isSuccess : type === 'recommendations' ? isSuccessRecommendations : isSuccessRecommendations;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (operatedSuccess && operatedData?.content) {
            setPosts(prevPosts => [...prevPosts, ...operatedData.content]);
        }
    }, [operatedData, operatedSuccess]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };
    return (
        <>
            {posts.length === 0 && operatedData?.content.length === 0 && <div className={styles.noPosts}>No posts yet</div>}
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={operatedData?.hasNext}
                loader={<div style={{ display: 'flex', width: '100%' }}><PostSkeleton /></div>}
                className={styles.infiniteWrapper}
            >
                {posts.map(post => (
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