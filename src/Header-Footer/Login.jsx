import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import GoogleSignin from "./GoogleSignin";

const Login = ({ setView, setLoggingIn }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LoginUser = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        setIsLoading(false);
        navigate("/");
      });
    } catch (error) {
      setErrorMesg(error.message);
    }
  };
  return (
    <>
      <div className="card text-center">
        <div className="card-header h1">Login</div>
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
          <div className="form-floating my-3">
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(ele) => setEmail(ele.target.value)}
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="form-floating my-3">
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(ele) => setPassword(ele.target.value)}
              placeholder="your password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-dark mx-md-5"
              onClick={LoginUser}
              type="button"
            >
              Login
            </button>
          </div>
        </div>

        <div className="mb-3">
          <GoogleSignin setLoggingIn={setLoggingIn} />
        </div>

        <div className="card-footer text-muted">
          New User?{" "}
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              setView("Signup");
            }}
          >
            Create Account here.
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
