import React, { useEffect, useState } from "react";
import PostCarousel from "./HomePageComponents/LatestCarousel";
import TrendingPosts from "./HomePageComponents/TrendingPosts";
import TrendingPost from "./TrendingPost";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <div className="my-3 p-2">
          <TrendingPosts />
          <br />
          <br />
          <PostCarousel />
        </div>
      </div>
    </>
  );
};

export default HomePage;
