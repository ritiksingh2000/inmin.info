import React, { useState } from "react";
import { AllPosts } from "../App";
import PostCard from "./PostCard";

const TrendingPost = () => {
  const allposts = AllPosts();
  const [searchFilter, setSearchFilter] = useState(null);

  allposts.sort((a, b) =>
    a.Likes.length < b.Likes.length
      ? 1
      : a.Likes.length > b.Likes.length
      ? -1
      : 0
  );
  return (
    <>
      <div className="container">
        <div className="col-10 col-md-9 mx-auto px-md-5 py-2">
          <div className="form-floating ">
            <input
              type="text"
              placeholder="Search A Topic"
              onChange={(ele) => {
                if (ele.target.value.length > 0) {
                  setSearchFilter(ele.target.value);
                } else {
                  setSearchFilter(null);
                }
              }}
              className="form-control"
              id="search"
            />
            <label htmlFor="search">Search A Topic</label>
          </div>
        </div>
        <div className="row g-0 mb-2">
          {searchFilter === null ? (
            <>
              <div className="card my-3">
                <p className="text-center h1 pt-1">Trending Posts</p>
              </div>
              <div className="col-11 col-md-8 p-1 mx-auto">
                {allposts
                  .filter((post) => allposts.indexOf(post) < 10)
                  .map((post) => {
                    return <PostCard post={post} key={post.id} />;
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="col-11 col-md-8 p-1 mx-auto">
                {allposts
                  .filter((post) => {
                    const postData =
                      `${post.Subject} ${post.Details}`.toLowerCase();

                    return postData.includes(searchFilter.toLowerCase());
                  })
                  .map((post) => {
                    return <PostCard post={post} key={post.id} />;
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingPost;
