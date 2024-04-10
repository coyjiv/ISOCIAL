import PropTypes from 'prop-types'
import { useGetSavedPostsQuery, useGetPostRecommendationsQuery } from '../../store/services/postService'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '../Post/Post'
import { PostSkeleton } from '../../views/Profile/skeletons/PostSkeleton'
import styles from './postsWrapper.module.scss'
import { userAvatar } from '../../data/placeholders'

const PostsWrapper = ({ type }) => {
    const [page, setPage] = useState(0)
    const { data: postsData, isSuccess, isLoading } = useGetSavedPostsQuery({ page }, { skip: type !== 'saved' });
    const { data: recommendations, isSuccess: isSuccessRecommendations, isLoading: isRecommendationsLoading } = useGetPostRecommendationsQuery({ page }, { skip: type !== 'recommendations' })

    const operatedData = type === 'saved' ? postsData : type === 'recommendations' ? recommendations : recommendations;
    const operatedSuccess = type === 'saved' ? isSuccess : type === 'recommendations' ? isSuccessRecommendations : isSuccessRecommendations;
    const operatedLoading = type === 'saved' ? isLoading : type === 'recommendations' ? isRecommendationsLoading : isRecommendationsLoading;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (operatedSuccess && operatedData?.content) {
            setPosts(prevData => {
                const dataMap = new Map();

                prevData.forEach(item => dataMap.set(item.id, item));
                operatedData.content.forEach(item => {
                    if (!dataMap.has(item.id)) {
                        dataMap.set(item.id, item);
                    }
                });

                return Array.from(dataMap.values());
            });
        }
    }, [operatedData, operatedSuccess]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    console.log(posts);

    return (
        <>
            {posts.length === 0 && operatedData?.content.length === 0 && operatedSuccess && <EmptyPosts type={type} />}
            {operatedLoading && <div className={styles.infiniteWrapper}>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>}
            {posts.length > 0 && <InfiniteScroll
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
                        avatarUrl={userAvatar({
                            avatarsUrl: [post.authorAvatarUrl],
                        }, post.authorFullName.split(' ')[0], post.authorFullName.split(' ')[1])}
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
            </InfiniteScroll>}
        </>
    )
}

PostsWrapper.propTypes = {
    type: PropTypes.string
}

const EmptyPosts = ({ type }) => {
    const title = type === 'saved' ? 'There will be your saved posts' : "You don't have any recommended posts yet."
    const description = type === 'saved' ? 'To save a post, click on the bookmark icon on the bottom left' : 'Either you have seen all the posts or there are no posts to recommend you.'
    return (
        <div className={styles.emptyPosts}>
            <img src="/postWrapper/no-recommendations.svg" alt="No posts found" />
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

EmptyPosts.propTypes = {
    type: PropTypes.string
}

export default PostsWrapper