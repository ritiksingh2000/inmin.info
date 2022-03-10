import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllCategories, CurrentUser } from "../App";
import { auth } from "../firebase";
import menuIcon from "./list.png";

const LoggeIn_Out = () => {
  const User = CurrentUser();
  const Categories = AllCategories();
  const userLogout = () => {
    signOut(auth).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className="col-md-7 mx-auto border-bottom border-2 pt-md-2  border-white">
        {User === null ? (
          <>
            <div className="text-center d-flex justify-content-center py-3 my-0">
              <div className="dropdown">
                <button
                  className="btn btn-light mx-1 dropdown-toggle"
                  type="button"
                  id="posts"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Posts
                </button>
                <ul className="dropdown-menu" aria-labelledby="posts">
                  <li>
                    <Link
                      to="/posts/all"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      All Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts/trending"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      Trending Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts/latest"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      Latest Posts
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-light mx-1  dropdown-toggle"
                  type="button"
                  id="Category"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </button>
                <ul className="dropdown-menu" aria-labelledby="Category">
                  {Categories !== null && Categories !== undefined && (
                    <>
                      {Categories.map((catgry) => (
                        <li
                          className="border-bottom border-dark"
                          key={catgry.id}
                        >
                          <Link
                            className="dropdown-item small"
                            to={`/${catgry.Name}/posts`}
                          >
                            <img
                              src={catgry.Image}
                              width="28px"
                              className="img-thumbnail"
                              alt="..."
                            />{" "}
                            {catgry.Name}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
              <Link
                to="/user/signup_login"
                className="btn btn-light px-1 py-1 px-md-2 mx-1"
              >
                Login/Signup
              </Link>
              <button
                type="button"
                className="btn btn-light py-0 px-1 mx-1"
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
              <div className="dropdown">
                <button
                  className="btn btn-light mx-1 dropdown-toggle"
                  type="button"
                  id="posts"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Posts
                </button>
                <ul className="dropdown-menu" aria-labelledby="posts">
                  <li>
                    <Link
                      to="/posts/all"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      All Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts/trending"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      Trending Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts/latest"
                      className="dropdown-item btn btn-light btn-sm mx-1 mt-2"
                    >
                      Latest Posts
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-light mx-1  dropdown-toggle"
                  type="button"
                  id="Category"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </button>
                <ul className="dropdown-menu" aria-labelledby="Category">
                  {Categories !== null && Categories !== undefined && (
                    <>
                      {Categories.map((catgry) => (
                        <li
                          className="border-bottom border-dark"
                          key={catgry.id}
                        >
                          <Link
                            className="dropdown-item small"
                            to={`/${catgry.Name}/posts`}
                          >
                            <img
                              src={catgry.Image}
                              width="28px"
                              className="img-thumbnail"
                              alt="..."
                            />{" "}
                            {catgry.Name}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-light px-1 py-1 px-md-2 mx-1 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={User.Image} width="28px" /> {User.Username}
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
                className="btn btn-light py-0 px-1 mx-1"
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
        className="modal fade"
        id="mainMenu"
        tabIndex="-1"
        aria-labelledby="mainMenu"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="mainMenu">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group list-group-flush">
                <center>
                  <Link
                    to="/About-Us/"
                    className="btn btn-sm my-3 btn-outline-dark list-group-item"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/Contact-Us/"
                    className="btn btn-sm my-3 btn-outline-dark list-group-item"
                  >
                    Contact Us
                  </Link>
                  <hr className="my-3" />
                  {User !== null && (
                    <>
                      {User.isAuthor == true ? (
                        <>
                          <Link
                            to="/add-post/"
                            className="btn btn-lg my-1 btn-success shadow fw-bold py-1"
                          >
                            Add Post
                          </Link>
                        </>
                      ) : (
                        <Link
                          to="/become-author/"
                          className="btn btn-lg my-1 btn-warning shadow fw-bold py-1"
                        >
                          Become Author
                        </Link>
                      )}
                    </>
                  )}
                  {/* <Link
                    to="/donate/"
                    className="btn btn-lg my-1 btn-warning shadow fw-bold py-1"
                  >
                    Donate
                  </Link> */}
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
