import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AllPosts } from "../App";
import Loading from "./ExtraComponents/Loading";
import PostCard from "./PostCard";

const SharedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const postId = useParams().PostId;
  const posts = AllPosts();
  const postCategory = posts
    .filter((post) => post.id === postId)
    .map((post) => post.Category);

  return (
    <>
      <div className="container px-md-3">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {posts
              .filter((post) => post.id === postId)
              .map((post) => (
                <PostCard post={post} key={post.id} />
              ))}

            <div className="card card-body my-3">
              <div className="card-header fw-bold fs-5">Related Posts</div>
              <div className="card-body">
                {posts
                  .filter((post) => post.Category === postCategory[0])
                  .map((post) => post).length > 0 ? (
                  <>
                    {posts
                      .filter((post) => post.Category === postCategory[0])
                      .map((post) => (
                        <PostCard post={post} key={post.id} />
                      ))}
                  </>
                ) : (
                  <>
                    <center>
                      <div className="alert alert-dark h3" role="alert">
                        No Posts
                      </div>
                    </center>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SharedPost;
