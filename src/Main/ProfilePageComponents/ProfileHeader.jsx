import React from "react";

const ProfileHeader = ({ profileUser }) => {
  return (
    <>
      <div className="p-2 card">
        <div className="row g-0 ">
          <div className="col-md-2 mx-auto">
            <center>
              {" "}
              <img src={profileUser.Image} alt="..." />
            </center>{" "}
          </div>
          <div className="col-md-10 p-2 pe-md-5 mx-auto">
            <h3 className="text-center text-md-start">
              {profileUser.FullName}{" "}
              <span className=" fs-6 fw-normal fst-italic">
                ({profileUser.Username})
              </span>
            </h3>
            <hr className="my-1" />
            <p className="text-center text-md-start small px-2">
              {profileUser.Bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
