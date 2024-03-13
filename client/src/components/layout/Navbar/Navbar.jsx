import { Link } from "react-router-dom";
import { navbarLinks } from "../../../data/navbarLinks";
import MessengerButton from "./actions/MessengerButton";
import { HeaderLinks } from "./HeaderLinks";
import NotificationButton from "./actions/NotificationButton";
import AvatarButton from "./actions/AvatarButton";
import { MainSearch } from "../../MainSearch";
import styles from "./navbar.module.scss";
import { Box, Drawer } from '@mui/material'
import { Typography } from "@mui/material";
import { useGetUserByNameQuery } from "../../../store/services/searchService";
import { useState } from "react";
import { useDebounce, useMediaQuery } from 'usehooks-ts';
import { MQ } from '../../../utils/constants/index.js'
import { ActionIconButton } from '../../index.js'

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
	const isTablet = useMediaQuery(MQ.TABLET)
	
	const [value, setValue] = useState("");
	const [open, setOpen] = useState(false)
  const debouncedValue = useDebounce(value);

	const { data } = useGetUserByNameQuery(
		{ name: debouncedValue },
		{ skip: debouncedValue === "" },
	);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
		<header className={styles.header}>
			{/* <MainSearch value={value} searchItems={data} onChange={handleChange} /> */}
      {!isMobile ? <MainSearch value={value} searchItems={data} onChange={handleChange} />
        : <Link to='/'style={{marginLeft: '16px'}}><Typography typography={'h1'} fontSize={22} fontWeight={'bold'}>iSocial</Typography></Link>}

      <nav className={styles.navWrapper}>
        <ul className={styles.navLinkList}>
          <HeaderLinks navbarLinks={navbarLinks} />
        </ul>
				<ul className={styles.actionList}>
				{isTablet && (
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
        <Box width="100vh" height="100vh">
          sadasda
        </Box>
      </Drawer>
    </header>
  );
};

export default Navbar;
