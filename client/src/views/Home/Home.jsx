import { withLayout } from "../../hooks/withLayout"
import styles from '../Saved/saved.module.scss'
import { Container } from "@mui/material";
import PostsWrapper from "../../components/PostsWrapper/index.jsx";
import { MainLinks } from "../../components/layout/Navbar/Navbar.jsx";
import { navbarLinks } from "../../data/navbarLinks.jsx";

const HomePage = () => {
    return (
        <main className={styles.container}>
            <nav className={styles.navbarLinks}>
                <h1 className={styles.title}>Feed</h1>
                <MainLinks navbarLinks={navbarLinks} />
            </nav>
            <Container className={styles.postContainer} maxWidth={'sm'}>
                <h1 className={styles.title}>Feed</h1>
                <PostsWrapper type="recommendations" />
            </Container>
        </main>

    )
}

const Home = withLayout((HomePage))
export default Home
