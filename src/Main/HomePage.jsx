import React, { useEffect, useState } from "react";
import Loading from "./ExtraComponents/Loading";
import PostCarousel from "./HomePageComponents/LatestCarousel";
import TrendingPosts from "./HomePageComponents/TrendingPosts";
import TrendingPost from "./TrendingPost";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <>
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="my-3 p-2">
            <TrendingPosts />
            <br />
            <br />
            <PostCarousel />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
