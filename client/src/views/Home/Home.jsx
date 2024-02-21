import { withLayout } from "../../hooks/withLayout"
import { Link } from "react-router-dom";
import {withWebsocket} from "../../hooks/withWebsocket.tsx";

const HomePage = () => {
  return (
    <Link to="/login">Log In</Link>
  )
}


const Home = withWebsocket(withLayout(HomePage))
export default Home