import React from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../App";
import { auth } from "../../firebase";
import Loading from "../ExtraComponents/Loading";

const Verification = () => {
  const navigate = useNavigate();
  const User = CurrentUser();
  return (
    <>
      <div className="container my-3 px-md-4">
        <div className="card card-body">
          {User ? (
            <>
              <div className="card-header text-center shadow-sm">
                <p className="h2">{User.FullName}, Want To Be An Author?</p>

                <p className="small fst-italic">
                  Accept the responsibility of an author to provide true
                  information.
                </p>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <div className="my-2">
                    <p>
                      By becoming an author you are accepting the
                      responsibilities of providing information that is{" "}
                      <strong>true, up to date and regular</strong>. If in any
                      case your post receives{" "}
                      <strong>
                        3 valid Reports, your Post Will get deleted.
                      </strong>
                    </p>
                    <p>
                      <strong>
                        By becoming an author you are accepting to :
                      </strong>
                    </p>
                    <ul>
                      <li>provide information that is 100% true.</li>
                      <li>
                        provide information regularly{" "}
                        <strong>i.e. minimum 2 posts in a week</strong>.
                      </li>
                      <li>
                        delete the post if there are 3 valid reports from users.
                      </li>
                    </ul>
                  </div>
                  {auth.currentUser.emailVerified ? (
                    <>
                      <button
                        type="button"
                        disabled
                        className="btn btn-success fw-bold fs-4 my-3"
                      >
                        {" "}
                        ✔ Email Verification Complete{" "}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          navigate("/become-author/email-verification/", {
                            state: User,
                          })
                        }
                        className="btn btn-warning fw-bold fs-4 my-3 shadow-lg"
                        type="button"
                      >
                        Email Verification
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
    </>
  );
};

export default Verification;
