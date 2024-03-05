import { navbarLinks } from "../../../data/navbarLinks";
import MessengerButton from "./actions/MessengerButton";
import { HeaderLinks } from "./HeaderLinks";
import NotificationButton from "./actions/NotificationButton";
import AvatarButton from "./actions/AvatarButton";
import { MainSearch } from "../../MainSearch";
import styles from "./navbar.module.scss";
import { useGetUserByNameQuery } from "../../../store/services/searchService";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";

const Navbar = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const { data } = useGetUserByNameQuery(debouncedValue, {
    skip: debouncedValue === "",
  });

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <header className={styles.header}>
      <MainSearch value={value} searchItems={data} onChange={handleChange} />

      <nav className={styles.navWrapper}>
        <ul className={styles.navLinkList}>
          <HeaderLinks navbarLinks={navbarLinks} />
        </ul>
        <ul className={styles.actionList}>
          <li>
            <NotificationButton />
          </li>
          <li>
            <MessengerButton />
          </li>
          <li>
            <AvatarButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
