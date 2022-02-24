import React, { useState } from "react";
import PostCard from "../PostCard";

const CategoryBody = ({ CTGposts }) => {
  const [searchFilter, setSearchFilter] = useState(null);
  const latestPosts = CTGposts.map((post) => {
    const pDate = new Date(post.CreatedAt);
    const theDate = `${pDate.getDate()}-${pDate.getDay()}-${pDate.getFullYear()} ${pDate.getHours()}:${pDate.getMinutes()}:${pDate.getSeconds()}`;
    return { ...post, theDate };
  });
  latestPosts.sort((a, b) =>
    a.theDate < b.theDate ? 1 : a.theDate > b.theDate ? -1 : 0
  );
  return (
    <>
      <div className="col-10 col-md-9 mx-auto px-md-5 py-2">
        <div className="form-floating ">
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
      </div>
      <div className="row g-0 mb-2">
        {searchFilter === null ? (
          <>
            <div className="col-11 col-md-9 p-1 mx-auto">
              {latestPosts
                .filter((post) => CTGposts.indexOf(post) < 10)
                .map((post) => {
                  return <PostCard post={post} key={post.id} />;
                })}
            </div>
          </>
        ) : (
          <>
            <div className="col-11 col-md-9 p-1 mx-auto">
              {CTGposts.filter((post) => {
                const postData =
                  `${post.Subject} ${post.Details}`.toLowerCase();

                return postData.includes(searchFilter.toLowerCase());
              }).map((post) => {
                return <PostCard post={post} key={post.id} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryBody;
