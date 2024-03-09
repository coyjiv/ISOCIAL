import { withLayout } from "../../hooks/withLayout"
import { withWebsocket } from "../../hooks/withWebsocket.jsx";
import styles from '../Saved/saved.module.scss'
import { Container } from "@mui/material";
import PostsWrapper from "../../components/PostsWrapper/index.jsx";

const HomePage = () => {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Feed</h1>
            <Container maxWidth={'sm'}>
                <PostsWrapper type="saved" />
            </Container>
        </main>

    )
}

const Home = withLayout(withWebsocket((HomePage)))
export default Home
