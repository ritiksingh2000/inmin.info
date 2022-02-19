import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUser } from "../App";
import { auth } from "../firebase";
import menuIcon from "./list.png";

const LoggeIn_Out = () => {
  const User = CurrentUser();
  const userLogout = () => {
    signOut(auth).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className="col-md-7 mx-auto border-bottom border-2 pt-md-4 border-white">
        {User === null ? (
          <>
            <div className="text-center d-flex justify-content-center py-3 my-0">
              <Link
                to="/posts/trending"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Trending
              </Link>

              <Link
                to="/posts/latest"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Latest
              </Link>
              <Link
                to="/user/signup_login"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Login/Signup
              </Link>
              <button
                type="button"
                class="btn btn-light py-0 px-1 mx-1"
                data-bs-toggle="modal"
                data-bs-target="#mainMenu"
              >
                <img src={menuIcon} alt="Menu" width="30px" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center d-flex justify-content-center py-3 my-0">
              <Link
                to="/posts/trending"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Trending
              </Link>

              <Link
                to="/posts/latest"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Latest
              </Link>
              <div class="dropdown">
                <button
                  class="btn btn-light px-1 py-1 px-md-2 mx-1 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={User.Image} width="28px" /> {User.Username}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link class="dropdown-item" to={`/user/${User.id}`}>
                      My Profile
                    </Link>
                  </li>
                  <hr className="my-1" />
                  <li>
                    <center>
                      <p
                        className="py-0 mb-0 btn btn-danger btn-sm"
                        onClick={userLogout}
                      >
                        Logout
                      </p>
                    </center>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                class="btn btn-light py-0 px-1 mx-1"
                data-bs-toggle="modal"
                data-bs-target="#mainMenu"
              >
                <img src={menuIcon} alt="Menu" width="30px" />
              </button>
            </div>
          </>
        )}
      </div>
      <div
        class="modal fade"
        id="mainMenu"
        tabindex="-1"
        aria-labelledby="mainMenu"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="mainMenu">
                Menu
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ul class="list-group list-group-flush">
                <center>
                  <Link
                    to="/"
                    class="btn btn-sm my-3 btn-outline-dark list-group-item"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/"
                    class="btn btn-sm my-3 btn-outline-dark list-group-item"
                  >
                    Contact Us
                  </Link>
                </center>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggeIn_Out;
