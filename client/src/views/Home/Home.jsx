import { withLayout } from "../../hooks/withLayout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return <Link to="/login">Log In</Link>;
};

const Home = withLayout(HomePage);
export default Home;
