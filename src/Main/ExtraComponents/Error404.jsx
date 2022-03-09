import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);
  return (
    <div className="row g-0">
      <div className="col-10 col-md-8 mx-auto">
        <div
          className="alert alert-danger border border-dark h4 my-5 py-5 text-center"
          role="alert"
        >
          Page Not Found. Redirecting to homepage . . .
        </div>
      </div>
    </div>
  );
};

export default Error404;
