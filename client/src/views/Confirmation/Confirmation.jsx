import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./Confirmation.module.scss";
import { GiBreakingChain } from "react-icons/gi";
import { PiHandshakeDuotone } from "react-icons/pi";
import { Typography } from "@mui/material";
import { BlueRoundedButton } from '../../components/buttons';
import { FaLink } from "react-icons/fa";
import { Emoji } from 'emoji-picker-react';

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/confirmation?id=${id}`,
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
          <Typography variant="h1" fontSize={26} fontWeight={900}>
          Hooray! Your account has been confirmed.
          </Typography>
          <div className={styles.chain}>
{/*           <Typography variant="h1" fontSize={20}> */}
{/*        Your account has been confirmed. */}
{/*         </Typography> */}
          <Typography variant="h1" fontSize={20}>
         You are now able to log in and explore our amazing app.
        </Typography>
        </div>
          <Emoji unified="1f973" size="45" className={styles.chain} />

{/*           <BlueRoundedButton onClick={() => navigate("/")}>Main page</BlueRoundedButton> */}
        </>
      ) : (
        <div className={styles.subwrapper}>

                <Typography variant="h1" fontSize={26} fontWeight={900}>
                Sadly, we are unable to verify your account.</Typography>
                <div className={styles.chain}>
                <Typography variant="h1" fontSize={20}>
                Please attempt the process again or contact us
                </Typography>
                <div className={styles.substring}>
                    <Typography variant="h1" fontSize={20} >via email at </Typography>
                    <a href="dontreply.isocial@gmail.com">
                   <Typography variant="h1" fontSize={20} color='#0866ff' >dontreply.isocial@gmail.com </Typography>
                   </a>
                </div>
                <Typography variant="h1" fontSize={16}>
                Alternatively, you can sign up using your Google account.
                </Typography>
            </div>
{/*           <FaLink className={styles.chain} /> */}
          <Emoji unified="1fae3" size="45" className={styles.chain} />
{/*           <Typography variant="h4" fontSize={16}>We can&apos;t confirm your account at the moment.</Typography> */}



      </div>
      )}
      <BlueRoundedButton onClick={() => navigate("/")} >Back to login</BlueRoundedButton>
    </main>
  );
};
export default Confirmation;