import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllPosts, PostsComments } from "../../App";
import HTMLReactParser from "html-react-parser";
import PostCard from "../PostCard";

const PostCarousel = () => {
  const allposts = AllPosts();
  const latestPosts = allposts.map((post) => {
    const pDate = new Date(post.CreatedAt);
    const theDate = `${pDate.getDate()}-${pDate.getDay()}-${pDate.getFullYear()} ${pDate.getHours()}:${pDate.getMinutes()}:${pDate.getSeconds()}`;
    return { ...post, theDate };
  });
  latestPosts.sort((a, b) =>
    a.theDate < b.theDate ? 1 : a.theDate > b.theDate ? -1 : 0
  );
  let post = [];
  latestPosts.forEach((ele, idx) => {
    if (idx < 3) {
      post.push(ele);
    }
  });
  return (
    <>
      <div className="card card-body">
        <div className="card-header text-center h1 shadow">Latest Posts</div>
        <div className="my-2">
          {post.length > 0 ? (
            <>
              {post.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </>
          ) : (
            <>
              <center>
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </center>
            </>
          )}
        </div>
        <div className="card-footer text-center">
          <center>
            <Link
              to="/posts/latest"
              className="btn btn-outline-dark btn-sm fs-4 py-0"
            >
              All Latest Posts
            </Link>
          </center>
        </div>
      </div>
    </>
  );
};

export default PostCarousel;
