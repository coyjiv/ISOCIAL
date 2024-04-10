import { useNavigate, useParams } from 'react-router-dom'
import { withLayout } from '../../hooks/withLayout'
import { useGetPostByIdQuery } from '../../store/services/postService'
import { PostSkeleton } from '../Profile/skeletons/PostSkeleton';
import PostComponent from '../../components/Post/Post';
import { Container } from '@mui/system';
import styles from './postview.module.scss'
import { ArrowBack } from '@mui/icons-material';
import { userAvatar } from '../../data/placeholders';

const PostView = () => {
    const { id } = useParams()

    const { data: post, isLoading } = useGetPostByIdQuery(id, { skip: !id })
    const navigate = useNavigate()

    return (
        <main className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}><ArrowBack /></button>
            <Container maxWidth={'sm'}>
                {(isLoading) ?
                    <PostSkeleton /> :
                    post && <PostComponent
                        postId={post?.id}
                        authorId={post?.authorId}
                        avatarUrl={userAvatar({
                            avatarsUrl: [post?.authorAvatarUrl],
                        }, post?.authorFullName?.split(' ')?.[0], post?.authorFullName?.split(' ')?.[1])}
                        username={post?.authorFullName}
                        creationDate={post?.creationDate}
                        textContent={post?.textContent}
                        images={post?.attachments}
                        likesCount={post?.likesCount}
                        commentsCount={post?.commentsCount}
                        recentComments={post?.recentComments}
                        liked={post?.liked}
                        onDeleted={() => {
                            navigate('/')
                        }}
                    />}
            </Container>
        </main>
    )
}

const Post = withLayout(PostView)

export default Post