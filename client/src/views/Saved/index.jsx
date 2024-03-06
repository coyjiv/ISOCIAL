import { Container } from "@mui/material"
import PostsWrapper from "../../components/PostsWrapper"
import { withLayout } from "../../hooks/withLayout"
import styles from './saved.module.scss'

const SavedPage = () => {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Saved posts</h1>
            <Container maxWidth={'sm'}>
                <PostsWrapper type="saved" />
            </Container>
        </main>
    )
}

const Saved = withLayout(SavedPage)

export default Saved