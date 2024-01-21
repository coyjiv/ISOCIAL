import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Confirmation.scss";
import { GiBreakingChain } from "react-icons/gi";
import { PiHandshakeDuotone } from "react-icons/pi";

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await axios.post(
          `http://localhost:9000/api/auth/confirmation?id=${id}`,
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
    <div className="confirmationMain">
      <div className="header"> iSOCIAL</div>
      {confirmed ? (
        <>
          <h1>Your account is confirmed!</h1>
          <PiHandshakeDuotone className="chain" />
        </>
      ) : (
        <>
          <h1>Somethihg went wrong.</h1>
          <GiBreakingChain className="chain" />
          <h4>We can&apos;t confirme Your account at the moment.</h4>{" "}
        </>
      )}
      <h4>Click bellow</h4>
      <button className="button" onClick={() => navigate("/")}>Main page</button>
    </div>
  );
};
export default Confirmation;