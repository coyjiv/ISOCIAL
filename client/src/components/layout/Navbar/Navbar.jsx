import { Link } from "react-router-dom";
import { navbarLinks } from "../../../data/navbarLinks";
import MessengerButton from "./actions/MessengerButton";
import { HeaderLinks } from "./HeaderLinks";
import NotificationButton from "./actions/NotificationButton";
import AvatarButton from "./actions/AvatarButton";
import { MainSearch } from "../../MainSearch";
import styles from "./navbar.module.scss";
import { Typography } from "@mui/material";
import { useGetUserByNameQuery } from "../../../store/services/searchService";
import { useState } from "react";
import { useDebounce, useMediaQuery } from "usehooks-ts";

const Navbar = () => {

  const isMobile = useMediaQuery('(max-width: 600px)');

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const { data } = useGetUserByNameQuery({ name: debouncedValue }, {
    skip: debouncedValue === "",
  });

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <header className={styles.header}>
      {!isMobile ? <MainSearch value={value} searchItems={data} onChange={handleChange} />
        : <Link to='/'style={{marginLeft: '16px'}}><Typography typography={'h1'} fontSize={22} fontWeight={'bold'}>iSocial</Typography></Link>}

      <nav className={styles.navWrapper}>
        <ul className={styles.navLinkList}>
          <HeaderLinks navbarLinks={navbarLinks} />
        </ul>
        <ul className={styles.actionList}>
          <li><NotificationButton /></li>
          <li><Link to='/chats'><MessengerButton /></Link></li>
          <li><AvatarButton /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
