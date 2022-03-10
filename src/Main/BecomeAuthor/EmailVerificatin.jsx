import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Loading from "../ExtraComponents/Loading";

const EmailVerificatin = () => {
  const location = useLocation();
  const User = location.state;
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  if (User) {
    if (User.E_Verify === true) {
      navigate("/become-author/");
    }
  } else {
    navigate("/");
  }
  console.log(auth.currentUser);
  return (
    <div className="container my-3 px-md-4">
      <div className="card card-body">
        {User ? (
          <>
            <div className="card-header text-center shadow-sm">
              <p className="h2">Email Verification</p>
            </div>

            <div className="card-body">
              <div className="d-grid gap-2 my-3">
                {emailSent === true ? (
                  <>
                    <button
                      disabled="disabled"
                      className="btn btn-outline-dark fs-4"
                    >
                      Verification Email Sent to{" "}
                      <span className="fst-italic fw-bold">{User.Email}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        const actionCodeSettings = {
                          url: "https://inmin-info.herokuapp.com/become-author/",
                        };
                        sendEmailVerification(
                          auth.currentUser,
                          actionCodeSettings
                        ).then(() => {
                          setEmailSent(true);
                        });
                      }}
                      className="btn btn-dark fs-4"
                      type="button"
                    >
                      Send Email To Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default EmailVerificatin;
