import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUser, PostReports } from "../../App";
import { db } from "../../firebase";

const Report = ({ post }) => {
  const Reports = PostReports();
  const User = CurrentUser();
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let alredayFiledReport = false;

  if (Reports.length > 0 && User !== null) {
    Reports.forEach((ele) => {
      User.id === ele.RepotedBy.id && post.id === ele.Post.id
        ? (alredayFiledReport = true)
        : (alredayFiledReport = false);
    });
  }

  const [reson, setReson] = useState(null);
  const FileReport = async () => {
    setErrorMesg();
    setSuccessMesg();
    setIsLoading(true);
    const reportRef = collection(db, "reportPosts");
    const fileReport = await addDoc(reportRef, {
      Post: post,
      Reason: reson,
      RepotedBy: User,
    })
      .then(() => {
        setSuccessMesg(`Report Filed Against ${post.Subject}`);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMesg(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {alredayFiledReport ? (
        <>
          <div
            className="alert alert-danger lead fw-bold p-2 text-center"
            role="alert"
          >
            You Have Alredy Filed A Report for This Post
          </div>
        </>
      ) : (
        <>
          {User === null ? (
            <>
              <div className="alert alert-warning shadow-sm" role="alert">
                <center>
                  <b>Please Login To Report The Post</b>
                  <br />
                  <Link
                    to="/user/signup_login"
                    className="btn btn-outline-dark shadow-sm btn-sm my-2"
                  >
                    Login - Signup
                  </Link>
                </center>
              </div>
            </>
          ) : (
            <>
              {successMesg && (
                <div className="alert alert-success my-2" role="alert">
                  {successMesg}
                </div>
              )}
              {errorMesg && (
                <div className="alert alert-danger my-2" role="alert">
                  {errorMesg}
                </div>
              )}
              {isLoading ? (
                <>
                  <center>
                    <button className="btn btn-light" type="button" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  </center>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <center>
                      <label htmlFor="reasonToReport" className="form-label h5">
                        Reason For The Report
                      </label>
                    </center>
                    <textarea
                      className="form-control"
                      id="reasonToReport"
                      onChange={(ele) => setReson(ele.target.value)}
                      placeholder="why do you want to report ?"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-outline-danger mx-md-5 fw-bold"
                      type="button"
                      onClick={FileReport}
                    >
                      Report
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Report;
