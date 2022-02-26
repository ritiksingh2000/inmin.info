import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllCategories, AllPosts } from "../../App";
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
      setIsLoading(false);
    }
  }, [Categories, posts, ctg]);

  return (
    <div className="container">
      {isLoading ? (
        <>
          <div className="card card-body my-4 py-5">
            <center>
              <button
                className="btn btn-dark btn-lg fs-3"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Loading Data . . .
              </button>
            </center>
          </div>
        </>
      ) : (
        <>
          {CTGposts.length > 0 && theCategory.length > 0 ? (
            <>
              <CategoryHeader theCategory={theCategory[0]} />
              <CategoryBody CTGposts={CTGposts} />
            </>
          ) : (
            <>
              <div className="card card-body">
                <center>
                  <div className="alert alert-dark h4 text-center" role="alert">
                    No Posts Related To {ctg}
                  </div>
                </center>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
