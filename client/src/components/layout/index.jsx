import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import PropTypes from 'prop-types'

const Layout = ({ children, navbar = true, footer = false }) => {
    return (
        <>
            {navbar && <Navbar />}
            {children}
            {footer && <Footer />}
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    navbar: PropTypes.bool,
    footer: PropTypes.bool
}

export default Layout
