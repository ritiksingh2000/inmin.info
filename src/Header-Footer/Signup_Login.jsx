import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { CurrentUser } from "../App";
import { useNavigate } from "react-router-dom";
import Loading from "../Main/ExtraComponents/Loading";

const Signup_Login = () => {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  CurrentUser() !== null && navigate("/");
  const [view, setView] = useState("login");
  return (
    <div className="row g-0">
      <div className="col-11 col-md-9 mx-auto">
        <div className="card-body card my-3 shadow-sm">
          {loggingIn ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {view === "login" ? (
                <>
                  <Login setView={setView} setLoggingIn={setLoggingIn} />
                </>
              ) : (
                <>
                  <Signup setView={setView} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup_Login;
