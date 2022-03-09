import React, { useState } from "react";
import { AllPosts } from "../../App";
import Loading from "../ExtraComponents/Loading";
import NoData from "../ExtraComponents/NoData";
import PostCard from "../PostCard";

const ProfilePosts = ({ profileUser }) => {
  const allPosts = AllPosts();
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const profileUserPosts = allPosts
    .filter((post) => post.By.id === profileUser.id)
    .map((post) => post);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="my-2">
            <div className="card  mb-3">
              <p className="text-center py-2 mt-1 h2">
                {profileUser.Username} Posts
              </p>
            </div>
            <div className="row g-0">
              {profileUserPosts.length === 0 ? (
                <>
                  <NoData />
                </>
              ) : (
                <>
                  {profileUserPosts.map((post) => {
                    return (
                      <div className="col-lg-6 mx-auto p-1" key={post.id}>
                        <PostCard post={post} key={post.id} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePosts;
