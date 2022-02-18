import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = ({ setView }) => {
  const [fName, setFName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [bio, setBio] = useState("Hi I am New to inmin.info.");
  const [cPassword, setCPassword] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [successMesg, setSuccessMesg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async () => {
    setErrorMesg();
    if (password === cPassword) {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (user) => {
          const userRef = collection(db, "users");
          const createUser = await addDoc(userRef, {
            FullName: fName,
            Email: email,
            Username: username,
            Bio: bio,
            isAuthor: false,
            Image:
              "https://img.icons8.com/external-others-inmotus-design/67/4a90e2/external-login-buttons-others-inmotus-design.png",
            uid: user.user.uid,
          }).catch((err) => setErrorMesg(err));
        }
      );
      setIsLoading(false);
      setSuccessMesg(
        "Account Created Successfully. Redirecting to login page...."
      );
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      setErrorMesg("Passwords did't match. Try Again");
    }
  };

  return (
    <>
      <div className="card text-center">
        <div className="card-header h1">Signup</div>
        <div className="card-body">
          {errorMesg && (
            <>
              <center>
                <div
                  className="alert alert-danger text-center my-3"
                  role="alert"
                >
                  {errorMesg}
                </div>
              </center>
            </>
          )}
          {successMesg ? (
            <>
              <center>
                <div
                  className="alert alert-success text-center my-3"
                  role="alert"
                >
                  {successMesg}
                </div>
              </center>
            </>
          ) : (
            <>
              {isLoading ? (
                <>
                  <center>
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </center>
                </>
              ) : (
                <>
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fName"
                      onChange={(ele) => setFName(ele.target.value)}
                      placeholder="Full Name"
                    />
                    <label htmlFor="fName">Full Name</label>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(ele) => setUsername(ele.target.value)}
                      id="Username"
                      placeholder="Username"
                    />
                    <label htmlFor="Username">Username</label>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      onChange={(ele) => setBio(ele.target.value)}
                      id="bio"
                    >
                      {bio}
                    </textarea>
                    <label htmlFor="bio">Bio</label>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(ele) => setEmail(ele.target.value)}
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(ele) => setPassword(ele.target.value)}
                      id="password"
                      placeholder="your password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(ele) => setCPassword(ele.target.value)}
                      id="ConfirmPassword"
                      placeholder="Confirm your password"
                    />
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-dark mx-md-5"
                      onClick={createUser}
                      type="button"
                    >
                      Signup
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          <br />
          <div className="card-footer text-muted">
            Already have an account?{" "}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                setView("login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
