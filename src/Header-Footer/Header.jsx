import React from "react";
import { Link } from "react-router-dom";
import LoggeIn_Out from "./LoggeIn_Out";

const Header = ({ errorMesg }) => {
  return (
    <div className="container">
      <header className="row m-0 px-0 py-2">
        <div className="col-md-5 mx-auto border-bottom border-2 border-white">
          <center>
            <Link
              to="/"
              className="text-white my-0 py-0 text-center"
              id="MainLogo"
            >
              inmin.info
            </Link>
            <p className="my-0 py-0 text-white fw-bold text-center">
              Information in minimum words
            </p>
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
  );
};

export default Header;
