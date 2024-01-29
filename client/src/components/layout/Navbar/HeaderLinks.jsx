import { NavLink } from "react-router-dom"
import styles from "./navbar.module.scss"

const HeaderLinks = ({ navbarLinks }) => {
    return navbarLinks.map((link) => (
        <li key={link.id}>
            <NavLink to={link.path} className={({ isActive }) => isActive ? styles.activeLink : styles.defaultLink}>
                {({ isActive }) => isActive ? <link.activeIcon /> : <link.defaultIcon />}
            </NavLink>
        </li>
    )
    )
}
export { HeaderLinks }  