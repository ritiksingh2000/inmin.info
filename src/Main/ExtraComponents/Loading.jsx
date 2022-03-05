import React from "react";

const Loading = () => {
  return (
    <div className="row row-cols-1 g-4">
      <center>
        <div className="col mx-auto p-md-3 bg-white">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Loading;
