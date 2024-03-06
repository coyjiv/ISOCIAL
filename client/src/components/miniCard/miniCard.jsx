import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { userAvatar } from "../../data/placeholders";
import styles from "./miniCard.module.scss";
// import styles from "../../views/Profile/profile.module.scss";

export const MiniCard = ({ user }) => {
  const { firstName, lastName, id } = user;

  return (
    <div className={styles.miniCard}>
      <Link className={styles.link} to={"/profile/" + id}>
        <Avatar src={userAvatar(user, firstName, lastName)} />
        <div className={styles.name}>
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </Link>
    </div>
  );
};
MiniCard.propTypes = {
  user: PropTypes.object,
};
