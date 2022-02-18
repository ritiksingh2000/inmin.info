import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUser } from "../App";
import { auth } from "../firebase";

const LoggeIn_Out = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const User = CurrentUser();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  const userLogout = () => {
    signOut(auth).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      {User === null ? (
        <>
          {screenSize < 763 ? (
            <div className="col-md-7 mx-auto border-bottom border-2 border-white  ">
              <p className="text-center py-2 my-0">
                <Link to="/" className="btn btn-light  py-1 mx-1">
                  Trending
                </Link>
                <Link to="/" className="btn btn-light  py-1 mx-1">
                  Latest
                </Link>

                <button
                  className="btn btn-light mx-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menuMobile"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <img src="https://img.icons8.com/ios-filled/28/000000/menu-rounded.png" />
                </button>
              </p>
              <div className="collapse my-2" id="menuMobile">
                <div className="card card-body">
                  <Link to="/" className="btn btn-outline-dark btn-sm m-1">
                    About-Us
                  </Link>
                  <Link to="/" className="btn btn-outline-dark btn-sm m-1">
                    Contact-Us
                  </Link>
                  <Link
                    to="/user/signup_login"
                    className="btn btn-outline-dark btn-sm m-1"
                  >
                    Login/Signup
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-7 mx-auto border-bottom border-2 border-white">
              <div className=" d-flex justify-content-center mt-4">
                <Link to="/" className="btn btn-light btn-sm m-1">
                  About-Us
                </Link>
                <Link to="/" className="btn btn-light btn-sm m-1">
                  Contact-Us
                </Link>
                <Link
                  to="/user/signup_login"
                  className="btn btn-light btn-sm m-1"
                >
                  Login/Signup
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {screenSize < 763 ? (
            <div className="col-md-7 mx-auto border-bottom border-2 border-white  ">
              <p className="text-center py-2 my-0">
                <Link to="/" className="btn btn-light px-1 py-0 mx-1">
                  Trending
                </Link>
                <Link to="/" className="btn btn-light px-1 py-0 mx-1">
                  Latest
                </Link>

                <button
                  className="btn btn-light p-1 mx-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#menuMobile"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <img src={User.Image} width="28px" />
                </button>
              </p>
              <div className="collapse my-2" id="menuMobile">
                <div className="card card-body">
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-dark btn-sm m-1 dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={`${User.Image}`} alt="..." width="25px" />{" "}
                      {User.Username}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to={`/user/${User.id}`}>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Become An Author
                        </a>
                      </li>
                      <hr className="my-1" />
                      <li>
                        <center>
                          <button
                            className=" btn btn-danger btn-sm"
                            onClick={userLogout}
                          >
                            Logout
                          </button>
                        </center>
                      </li>
                    </ul>
                  </div>
                  <Link to="/" className="btn btn-outline-dark btn-sm m-1">
                    About-Us
                  </Link>
                  <Link to="/" className="btn btn-outline-dark btn-sm m-1">
                    Contact-Us
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-7 mx-auto border-bottom border-2 border-white">
              <div className=" d-flex justify-content-center mt-4">
                <Link to="/" className="btn btn-light btn-sm m-1">
                  About-Us
                </Link>
                <Link to="/" className="btn btn-light btn-sm m-1">
                  Contact-Us
                </Link>
                <div className="dropdown">
                  <button
                    className="btn btn-dark btn-sm m-1 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={`${User.Image}`} alt="..." width="24px" />{" "}
                    {User.Username}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to={`/user/${User.id}`}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Become An Author
                      </a>
                    </li>
                    <hr className="my-1" />
                    <li className="dropdown-item ">
                      <center>
                        <button
                          className=" btn btn-danger btn-sm"
                          onClick={userLogout}
                        >
                          Logout
                        </button>
                      </center>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoggeIn_Out;
