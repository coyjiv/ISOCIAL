import { Link } from "react-router-dom";
import { navbarLinks } from "../../../data/navbarLinks.jsx";
import MessengerButton from "./actions/MessengerButton";
import { HeaderLinks } from "./HeaderLinks";
import NotificationButton from "./actions/NotificationButton";
import AvatarButton from "./actions/AvatarButton";
import { MainSearch } from "../../MainSearch";
import styles from "./navbar.module.scss";
import { Avatar, Box, Drawer } from '@mui/material'
import { Typography } from "@mui/material";

import { useState } from "react";
import { useMediaQuery } from 'usehooks-ts';
import { ActionIconButton } from '../../index.js'

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      {/* <MainSearch value={value} searchItems={data} onChange={handleChange} /> */}
      {!isMobile ? <MainSearch />
        : <Link to='/' style={{ marginLeft: '16px' }}><Typography typography={'h1'} fontSize={22} fontWeight={'bold'}>iSocial</Typography></Link>}

      <nav className={styles.navWrapper}>
        <ul className={styles.navLinkList}>
          <HeaderLinks navbarLinks={navbarLinks} />
        </ul>
        <ul className={styles.actionList}>
          {isMobile && (
            <Box component="li" mr="10px">
              <ActionIconButton
                size="24px"
                icon="burger"
                variant="iconWithBg"
                onClick={() => setOpen(!open)}
              />
            </Box>
          )}
          <li><NotificationButton /></li>
          <li><Link to='/chats'><MessengerButton /></Link></li>
          <li><AvatarButton /></li>
        </ul>
      </nav>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box width="100vw" height="100vh" paddingTop={'50px'}>
          <MainLinks navbarLinks={navbarLinks} />
        </Box>
      </Drawer>
    </header>
  );
};

export default Navbar;

import PropTypes from 'prop-types'
import { useGetProfileByIdQuery } from "../../../store/services/profileService.js";
import { userAvatar } from "../../../data/placeholders.js";

const MainLinks = ({ navbarLinks }) => {
  const { data: profile, isLoading } = useGetProfileByIdQuery(localStorage.getItem('userId'))
  return (
    <div className={styles.mainLinkWrapper}>
      {!isLoading && <Link to={`/profile`} className={styles.mainLink}>
        <Avatar alt="User profile avatar" src={userAvatar(profile)} />
        <span className={styles.name}>{profile?.firstName} {profile?.lastName}</span>
      </Link>}
      {navbarLinks.map((link, index) => (
        <Link key={index} to={link.path} className={styles.mainLink}>
          {link.mainLinksIcon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

MainLinks.propTypes = {
  navbarLinks: PropTypes.array.isRequired,
};


