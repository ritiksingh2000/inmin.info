import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUser } from "../../App";
import { db } from "../../firebase";
import EditPost from "./EditPost";
import Report from "./Report";

const PostHeader = ({ post }) => {
  const User = CurrentUser();
  return (
    <>
      <div className="card-header shadow-sm row px-0 pt-2 pb-0 m-0">
        <div className="col-8 mx-auto">
          <Link
            to={`/user/${post.By.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex">
              <div className="flex-shrink-0">
                <img src={post.By.Image} alt="..." width="38px" />
              </div>
              <div className="flex-grow-1 ms-2 h6">
                {"  " + post.By.Username} &nbsp;
                <br />
                <small className="text-muted fw-normal fst-italic">
                  {post.CreatedAt.substring(0, 21)}
                </small>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4 mx-auto">
          <p className="text-end">
            <span className="small ">
              {User !== null && (
                <>
                  {User.id === post.By.id && (
                    <>
                      <EditPost User={User} post={post} />
                    </>
                  )}
                </>
              )}
              <button
                type="button"
                className="btn btn-danger btn-sm shadow-sm py-0"
                data-bs-toggle="modal"
                data-bs-target={`#reportPost${post.id}`}
              >
                !
              </button>{" "}
            </span>
          </p>
        </div>
        <div
          className="modal fade"
          id={`reportPost${post.id}`}
          tabIndex="-1"
          aria-labelledby="reportPost"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="reportPost">
                  <b className="text-danger">Report : </b>{" "}
                  <small className="fst-italic">{post.Subject}</small>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Report post={post} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
