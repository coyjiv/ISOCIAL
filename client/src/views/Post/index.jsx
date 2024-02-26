import { useParams } from 'react-router-dom'
import { withLayout } from '../../hooks/withLayout'
import { useGetPostByIdQuery } from '../../store/services/postService'
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PostSkeleton } from '../Profile/skeletons/PostSkeleton';
import PostComponent from '../../components/Post/Post';
import { Container } from '@mui/system';

const PostView = () => {
    const { id } = useParams()

    const { data: post, error, isLoading } = useGetPostByIdQuery(id, { skip: !id })

    console.log('post', post, error, isLoading);
    return (
        <main>
            <Container maxWidth={'sm'}>
                {(isLoading) ?
                    <PostSkeleton /> :
                    post && <PostComponent
                        postId={post?.id}
                        authorId={post?.authorId}
                        avatarUrl={post?.authorAvatar}
                        username={post?.authorFullName}
                        creationDate={post?.creationDate}
                        textContent={post?.textContent}
                        images={post?.attachments}
                        likesCount={post?.likesCount}
                        commentsCount={post?.commentsCount}
                        recentComments={post?.recentComments}
                        liked={post?.liked}
                    />}
            </Container>
        </main>
    )
}

const Post = withLayout(PostView)

export default Post