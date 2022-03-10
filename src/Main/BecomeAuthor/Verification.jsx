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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                  accusamus corrupti est et debitis minima expedita molestiae
                  quo corporis ea sapiente fugit ipsum consequuntur a, nisi
                  ducimus quos. Officia, optio! Repellendus odio ea provident
                  consectetur velit debitis ipsa libero error inventore
                  temporibus esse consequuntur, nesciunt nam. Similique porro
                  ullam, ex recusandae, natus sunt hic, officiis quia distinctio
                  consequatur odit quae. Amet cumque, corporis quae mollitia
                  similique rerum suscipit non, animi dolorum blanditiis
                  adipisci facere, ipsam in quod ullam!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                  accusamus corrupti est et debitis minima expedita molestiae
                  quo corporis ea sapiente fugit ipsum consequuntur a, nisi
                  ducimus quos. Officia, optio! Repellendus odio ea provident
                  consectetur velit debitis ipsa libero error inventore
                  temporibus esse consequuntur, nesciunt nam. Similique porro
                  ullam, ex recusandae, natus sunt hic, officiis quia distinctio
                  consequatur odit quae. Amet cumque, corporis quae mollitia
                  similique rerum suscipit non, animi dolorum blanditiis
                  adipisci facere, ipsam in quod ullam!
                </p>

                <div className="d-grid gap-2">
                  {auth.currentUser.emailVerified ? (
                    <>
                      <buttons
                        type="button"
                        disabled
                        className="btn btn-success fw-bold fs-4 my-3"
                      >
                        {" "}
                        ✔ Email Verification Complete{" "}
                      </buttons>
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
