import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Signup_Login = () => {
  const [view, setView] = useState("login");
  return (
    <div className="row g-0">
      <div className="col-11 col-md-9 mx-auto">
        <div className="card-body card my-3 shadow-sm">
          {view === "login" ? (
            <>
              <Login setView={setView} />
            </>
          ) : (
            <>
              <Signup setView={setView} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup_Login;
