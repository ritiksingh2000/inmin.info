import React from "react";

const CategoryHeader = ({ theCategory }) => {
  return (
    <>
      <div className="card card-body">
        <div className="card-header shadow">
          <p className="h1 text-center">
            <img src={theCategory.Image} alt="..." width="50px" />{" "}
            {theCategory.Name} Posts
          </p>
          <hr className="my-2" />
          <p className="px-md-5 px-3 small text-center">
            {theCategory.Description}
          </p>
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
