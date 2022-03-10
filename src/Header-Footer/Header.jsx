import React from "react";
import { Link } from "react-router-dom";
import LoggeIn_Out from "./LoggeIn_Out";
import logoImg from "./logo.png";
import AddPost from "../Main/AddPost";
import { CurrentUser } from "../App";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Header = ({ errorMesg }) => {
  const User = CurrentUser();
  if (User) {
    if (User.E_Verify === false || User.isAuthor === false) {
      if (auth.currentUser.emailVerified === true) {
        const userRef = doc(db, "users", User.id);
        const SetEmailVerificationStatus = async () => {
          await updateDoc(userRef, {
            E_Verify: true,
            isAuthor: true,
          });
        };
        SetEmailVerificationStatus();
      }
    }
  }
  return (
    <>
      <div className="container">
        <header className="row m-0 px-0 py-2">
          <div className="col-md-5 mx-auto border-bottom border-2 py-1 border-white">
            <center>
              <img src={logoImg} alt="..." width="46px" id="logoImg" />
              <Link
                to="/"
                className="text-white text-decoration-none my-0 py-0 text-center"
                id="MainLogo"
              >
                {" "}
                inmin.info <br />
              </Link>
            </center>
          </div>
          <LoggeIn_Out />
        </header>
        {errorMesg && (
          <>
            <center>
              <div className="alert alert-danger text-center" role="alert">
                {errorMesg}
              </div>
            </center>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
