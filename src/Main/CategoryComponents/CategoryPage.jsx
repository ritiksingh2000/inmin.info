import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllCategories, AllPosts } from "../../App";
import Loading from "../ExtraComponents/Loading";
import NoData from "../ExtraComponents/NoData";
import CategoryBody from "./CategoryBody";
import CategoryHeader from "./CategoryHeader";

const CategoryPage = () => {
  const posts = AllPosts();
  const ctg = useParams().category;
  const Categories = AllCategories();
  const [isLoading, setIsLoading] = useState(true);
  const [CTGposts, setCTGposts] = useState([]);
  const [theCategory, setTheCategory] = useState([]);
  useEffect(() => {
    if (Categories.length > 0 && posts.length > 0) {
      const filteredPosts = posts
        .filter((post) => post.Category === ctg)
        .map((post) => post);
      setCTGposts(filteredPosts);
      const filteredCatg = Categories.filter((catg) => catg.Name === ctg).map(
        (catg) => catg
      );
      setTheCategory(filteredCatg);
    }
  }, [Categories, posts, ctg]);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <div className="container">
      <CategoryHeader theCategory={theCategory[0]} />
      {isLoading ? (
        <Loading />
      ) : CTGposts.length === 0 ? (
        <>
          <NoData />
        </>
      ) : (
        <>
          {CTGposts.length > 0 && theCategory.length > 0 ? (
            <>
              <CategoryBody CTGposts={CTGposts} />
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
