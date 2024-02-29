import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./Confirmation.module.scss";
import { GiBreakingChain } from "react-icons/gi";
import { PiHandshakeDuotone } from "react-icons/pi";
import { Typography } from "@mui/material";

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/confirmation?id=${id}`,
          undefined,
          { headers: { "Content-Type": "application/json" } }
        );
        if (status === 204) {
          setConfirmed(true);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.confirmationMain}>
      {confirmed ? (
        <>
          <Typography variant="h1" fontSize={22}>Your account is confirmed!</Typography>
          <PiHandshakeDuotone className={styles.chain} />
        </>
      ) : (
        <div className={styles.subwrapper}>
          <Typography variant="h1" fontSize={22}>Something went wrong.</Typography>
          <GiBreakingChain className={styles.chain} />
          <Typography variant="h4" fontSize={16}>We can&apos;t confirm your account at the moment.</Typography>
        </div>
      )}
      <Typography>Click bellow</Typography>
      <button className={styles.button} onClick={() => navigate("/")}><Typography>Main page</Typography></button>
    </main>
  );
};
export default Confirmation;