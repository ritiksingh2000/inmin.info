import React from "react";
import loadingImg from "./MainLoadingScreen.gif";

const Loading = () => {
  return (
    <div className="row row-cols-1 g-4">
      <center>
        <div className="col mx-auto p-md-3 bg-white">
          <center>
            <div className="row g-0">
              <div className="col-md-6 mx-auto">
                <img src={loadingImg} className="img-fluid" alt="..." />
              </div>
            </div>
            <p className="text-center h2">Loading Please Wait . . .</p>
          </center>
        </div>
      </center>
    </div>
  );
};

export default Loading;
