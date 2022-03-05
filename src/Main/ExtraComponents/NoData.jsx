import React from "react";

const NoData = () => {
  return (
    <div className="row row-cols-2 g-0 my-3">
      <div className="col mx-auto p-md-3 bg-white rounded">
        <div className="alert alert-dark text-center" role="alert">
          No Data Found
        </div>
      </div>
    </div>
  );
};

export default NoData;
