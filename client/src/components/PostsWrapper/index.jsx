import PropTypes from 'prop-types'
import { useGetSavedPostsQuery } from '../../store/services/postService'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../Post/Post'
import { PostSkeleton } from '../../views/Profile/skeletons/PostSkeleton'
import styles from './postsWrapper.module.scss'

const PostsWrapper = ({ type }) => {
    const [page, setPage] = useState(0)
    const { data: postsData, isSuccess } = useGetSavedPostsQuery({ page }, { skip: type !== 'saved' });

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (isSuccess && postsData?.content) {
            setPosts(prevPosts => [...prevPosts, ...postsData.content]);
        }
    }, [postsData, isSuccess]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };
    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={postsData?.hasNext}
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