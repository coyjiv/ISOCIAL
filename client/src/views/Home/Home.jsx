import {withLayout} from "../../hooks/withLayout"
import {Link} from "react-router-dom";
import {withWebsocket} from "../../hooks/withWebsocket.jsx";
import {useDocumentTitle} from "usehooks-ts";


const HomePage = () => {
    useDocumentTitle('Feed')
    return (
        <>
            <Link to="/login">Log In</Link>
        </>

    )
}

const Home = withLayout(withWebsocket((HomePage)))
export default Home
