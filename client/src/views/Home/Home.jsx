import {withLayout} from "../../hooks/withLayout"
import {Link} from "react-router-dom";
import {withWebsocket} from "../../hooks/withWebsocket.jsx";
import {useDocumentTitle} from "usehooks-ts";
import {ToastContainer} from "react-toastify";


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
