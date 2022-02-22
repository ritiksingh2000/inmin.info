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
        <div className="row g-0">
          <div className="col-10 col-md-8 mx-auto px-md-5 py-1">
            <div className="row g-0">
              <div className="col-9 mx-auto">
                <center>
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
                </center>
              </div>
              {User !== null && (
                <>
                  {User.isAuthor && (
                    <>
                      <div className="col-3 ">
                        <center>
                          <button
                            type="button"
                            className="btn btn-light px-2 py-3 fw-bold"
                            data-bs-toggle="modal"
                            data-bs-target="#addPost"
                          >
                            Add Post
                          </button>

                          <div
                            className="modal fade"
                            id="addPost"
                            tabIndex="-1"
                            aria-labelledby="addPost"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog     modal-lg  ">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="addPost">
                                    Add Post
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <AddPost />
                                </div>
                              </div>
                            </div>
                          </div>
                        </center>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="row g-0 my-2">
            {searchFilter === null ? (
              <>
                <div className="col-11 col-md-10 p-1 mx-auto">
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
