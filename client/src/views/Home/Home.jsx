import { withLayout } from "../../hooks/withLayout"
import { Link } from "react-router-dom";

import {
  StompSessionProvider,
  useSubscription,
} from "react-stomp-hooks";

const HomePage = () => {
  return (
    <StompSessionProvider url={"http://localhost:9000/ws"}>
      <TestComp />
    </StompSessionProvider>
    // <Link to="/login">Log In</Link>
  )
}

const TestComp = () => {
  useSubscription("/2/queue/messages", (message) => console.log(message));

  return (
    <p></p>
  )
}


const Home = withLayout(HomePage)
export default Home