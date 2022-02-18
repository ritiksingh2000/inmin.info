import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProfileHeader from "./ProfilePageComponents/ProfileHeader";
import ProfilePosts from "./ProfilePageComponents/ProfilePosts";

const ProfilePage = () => {
  const UserId = useParams().userId;
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorMesg, setErrorMesg] = useState();

  useEffect(async () => {
    setIsLoadingData(true);
    const UserRef = doc(db, "users", UserId);
    const getUser = await getDoc(UserRef)
      .then((doc) => {
        const TheData = doc.data();
        const completeData = { ...TheData, id: UserId };
        setProfileUser(completeData);
      })
      .catch((err) => setErrorMesg(err));
    setIsLoadingData(false);
  }, []);

  return (
    <>
      <div className="container">
        {isLoadingData ? (
          <>
            <div className="card m-2 p-3">
              <center>
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </center>
            </div>
          </>
        ) : (
          <>
            {errorMesg && (
              <>
                <div className="card m-2 p-3">
                  <center>
                    <div className="alert alert-danger" role="alert">
                      {errorMesg}
                    </div>
                  </center>
                </div>
              </>
            )}

            {isLoadingData === false && profileUser !== undefined ? (
              <>
                <ProfileHeader profileUser={profileUser} />
                <ProfilePosts profileUser={profileUser} />
              </>
            ) : (
              <>
                <center>
                  <div className="alert alert-danger h2" role="alert">
                    Unable To get Data
                  </div>
                </center>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
