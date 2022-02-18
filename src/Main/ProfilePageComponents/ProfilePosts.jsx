import React from "react";
import { AllPosts } from "../../App";
import PostCard from "../PostCard";

const ProfilePosts = ({ profileUser }) => {
  const allPosts = AllPosts();
  const profileUserPosts = allPosts
    .filter((post) => post.By.id === profileUser.id)
    .map((post) => post);
  return (
    <>
      <div className="my-2">
        <div className="card  mb-3">
          <p className="text-center py-2 mt-1 h2">
            {profileUser.Username} Posts
          </p>
        </div>
        <div className="row g-0">
          {profileUserPosts.map((post) => {
            return (
              <>
                <div className="col-lg-6 mx-auto p-1">
                  <PostCard post={post} key={post.id} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePosts;
