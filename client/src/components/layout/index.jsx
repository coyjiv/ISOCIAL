import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import PropTypes from 'prop-types'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withWebsocket } from '../../hooks/withWebsocket';

const LayoutWrapper = ({ children, navbar = true, footer = false }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        if (!refresh && !access) {
            navigate("/login")
        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            {navbar && <Navbar />}
            {children}
            {footer && <Footer />}
        </>
    )
}

LayoutWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    navbar: PropTypes.bool,
    footer: PropTypes.bool
}

const Layout = withWebsocket(LayoutWrapper)

export default Layout
