import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const GoogleSignin = ({ setLoggingIn }) => {
  const navigate = useNavigate();
  const SignInWithGoogle = () => {
    setLoggingIn(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userCredentials = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = userCredentials.accessToken;
        const User = result.user;
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMesg = err.message;
        const emailUsed = err.email;
        const errorCred = GoogleAuthProvider.credentialFromError(err);
        console.log(errorCode, errorCred, errorMesg, emailUsed);
      });
  };
  return (
    <>
      <center>
        <hr />{" "}
        <button
          className="btn btn-light  shadow-sm"
          onClick={SignInWithGoogle}
          type="button"
        >
          <img
            className="img-fluid"
            src="https://img.icons8.com/color/32/000000/google-logo.png"
          />
          {"  "} SignIn With Google
        </button>
      </center>
    </>
  );
};

export default GoogleSignin;
