import React from "react";
import { Link } from "react-router-dom";
import LoggeIn_Out from "./LoggeIn_Out";
import logoImg from "./logo.png";
import AddPost from "../Main/AddPost";
import { CurrentUser } from "../App";

const Header = ({ errorMesg }) => {
  const User = CurrentUser();
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

      <div className="row g-0">
        <div className="col-md-4 mx-auto">
          {User !== null && (
            <>
              {User.isAuthor && (
                <>
                  <center>
                    <button
                      type="button"
                      className="btn btn-light mb-2  px-3 fw-bold"
                      data-bs-toggle="modal"
                      data-bs-target="#addPost"
                    >
                      Add Post
                    </button>

                    <div
                      className="modal fade"
                      id="addPost"
                      tabIndex="-1"
                      aria-labelledby="addPost"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog     modal-lg  ">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="addPost">
                              Add Post
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <AddPost />
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
