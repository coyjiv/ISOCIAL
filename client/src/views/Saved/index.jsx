import { Container } from "@mui/material"
import PostsWrapper from "../../components/PostsWrapper"
import { withLayout } from "../../hooks/withLayout"
import styles from './saved.module.scss'
import { MainLinks } from "../../components/layout/Navbar/Navbar"
import { navbarLinks } from "../../data/navbarLinks"

const SavedPage = () => {
    return (
        <main className={styles.container}>
            <nav className={styles.navbarLinks}>
                <h1 className={styles.title}>Saved posts</h1>
                <MainLinks navbarLinks={navbarLinks} />
            </nav>
            <Container className={styles.postContainer} sx={{ margin: '0 auto' }} maxWidth={'sm'}>
                <h1 className={styles.title}>Saved posts</h1>
                <PostsWrapper type="saved" />
            </Container>
        </main>
    )
}

const Saved = withLayout(SavedPage)

export default Saved