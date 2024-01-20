import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      {confirmed ? (
        <h2>Your account is confirmed!</h2>
      ) : (
        <h2>Something went wrong. We can't confirm Your account</h2>
      )}
      <h2>Click bellow</h2>
      <button onClick={() => navigate("/")}>Main page</button>
    </div>
  );
};
export default Confirmation;
