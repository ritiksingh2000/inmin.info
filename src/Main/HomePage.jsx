import React, { useEffect, useState } from "react";
import { AllPosts, CurrentUser } from "../App";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import loadingImg from "./imgs/MainLoadingScreen.gif";

const HomePage = () => {
  const allposts = AllPosts();
  const User = CurrentUser();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchFilter, setSearchFilter] = useState(null);
  const [errorMesg, setErrorMesg] = useState();
  useEffect(() => {
    if (allposts.length > 0 || User !== null) {
      setIsLoadingData(false);
    }
  }, [allposts, User]);
  return (
    <>
      {isLoadingData ? (
        <center>
          <div className="container">
            <div className="card card-body my-3">
              <div className="row g-0">
                <div className="col-md-6 mx-auto">
                  <img src={loadingImg} className="img-fluid" alt="..." />
                </div>
              </div>
              <p className="text-center h2">Loading Data . . .</p>
            </div>
          </div>
        </center>
      ) : (
        <div className="container">
          <div className="row g-0 my-2">
    <div className="col-10 col-md-9 mx-auto px-md-5 py-2">
                  <div className="form-floating">
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
            {User !== null && (
              <>
                
                {User.isAuthor === true && (
                  <>
                    <div className="col-11 col-md-4 mx-auto mt-1 mb-3 px-2">
                      <div className="card card-body sticky-top">
                        <p className="h4 text-center p-2 bg-light shadow-sm">
                          Add Post
                        </p>
                        <AddPost />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {searchFilter === null ? (
              <>
                <div className="col-11 col-md-8 p-1 mx-auto">
                  {allposts.map((post) => {
                    return <PostCard post={post} key={post.id} />;
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="col-11 col-md-8 p-1 mx-auto">
                  {errorMesg ? (
                    <>
                      <div
                        className="alert alert-danger text-center h5"
                        role="alert"
                      >
                        {errorMesg}
                      </div>
                    </>
                  ) : (
                    <>
                      {allposts
                        .filter((post) => {
                          const postData =
                            `${post.Subject} ${post.Details}`.toLowerCase();

                          return postData.includes(searchFilter.toLowerCase());
                        })
                        .map((post) => {
                          return <PostCard post={post} key={post.id} />;
                        })}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
