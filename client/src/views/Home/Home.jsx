import { withLayout } from "../../hooks/withLayout"
import {Link} from "react-router-dom";
import Post from "../../components/Post/Post.jsx";

const HomePage = () => {
  return (
    // <Link to="/login">Log In</Link>
      <Post postId={1} authorId={1}
          avatarUrl={'https://cdn-icons-png.flaticon.com/512/5556/5556512.png'}
          username={'Anastasia Uskova'}
          creationDate={new Date()}
          textContent={'Oohhh, sci-fi satisfaction'}
          images={[
              'https://s.ill.in.ua/i/news/570x380/291/291360.jpg'
          ]}/>
  )
}


const Home = withLayout(HomePage)
export default Home