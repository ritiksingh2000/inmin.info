import React, { useEffect, useState } from "react";
import { AllPosts, CurrentUser } from "../App";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import NoData from "./ExtraComponents/NoData";
import Loading from "./ExtraComponents/Loading";

const AllPostsPage = () => {
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
        <Loading />
      ) : (
        <>
          {allposts.length === 0 ? (
            <>
              <NoData />
            </>
          ) : (
            <>
              <div className="row g-0">
                <div className="col-10 col-md-8 mx-auto px-md-5 py-1">
                  <div className="row g-0">
                    <div className="col-9 mx-auto">
                      <center>
                        <div className="form-floating">
                          <input
                            type="text"
                            placeholder="Search A Keywoard"
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
                          <label htmlFor="search">Search A Keywoard</label>
                        </div>
                      </center>
                    </div>
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

                                return postData.includes(
                                  searchFilter.toLowerCase()
                                );
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default AllPostsPage;
