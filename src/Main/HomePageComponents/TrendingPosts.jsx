import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllPosts, PostsComments } from "../../App";
import HTMLReactParser from "html-react-parser";
import PostCard from "../PostCard";
import Loading from "../ExtraComponents/Loading";
import NoData from "../ExtraComponents/NoData";

const TrendingPosts = () => {
  const allposts = AllPosts();
  const trendingPost = allposts.sort((a, b) =>
    a.Likes.length < b.Likes.length
      ? 1
      : a.Likes.length > b.Likes.length
      ? -1
      : 0
  );
  let post = [];
  trendingPost.forEach((ele, idx) => {
    if (idx < 3) {
      post.push(ele);
    }
  });
  return (
    <>
      <div className="card card-body">
        <div className="card-header text-center h1 shadow">Trending Posts</div>
        <div className="my-2">
          {post.length > 0 ? (
            <>
              {post.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </>
          ) : (
            <NoData />
          )}
        </div>
        <div className="card-footer text-center">
          <center>
            <Link
              to="/posts/trending"
              className="btn btn-outline-dark btn-sm fs-5 py-0"
            >
              All Trending Posts
            </Link>
          </center>
        </div>
      </div>
    </>
  );
};

export default TrendingPosts;
