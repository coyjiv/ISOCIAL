import { Typography } from "@mui/material"
import { navbarLinks } from "../../../data/navbarLinks";
import MessengerButton from "./actions/MessengerButton";
import { HeaderLinks } from "./HeaderLinks";
import styles from "./navbar.module.scss"
import NotificationButton from "./actions/NotificationButton";
import AvatarButton from "./actions/AvatarButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Link to='/'><Typography typography={'h1'} fontSize={22} fontWeight={'bold'}>iSocial</Typography></Link>
      <nav className={styles.navWrapper}>
        <ul className={styles.navLinkList}>
          <HeaderLinks navbarLinks={navbarLinks} />
        </ul>
        <ul className={styles.actionList}>
          <li><NotificationButton /></li>
          <li><MessengerButton /></li>
          <li><AvatarButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar