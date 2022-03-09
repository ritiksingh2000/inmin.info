import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostContent = ({ post }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const Details = HTMLReactParser(post.Details);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);
  return (
    <>
      <div className="card-body p-1">
        {screenSize > 768 ? (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                {post.Image != null && (
                  <img
                    src={post.Image}
                    id="postImg"
                    className="img-fluid"
                    alt="..."
                  />
                )}
              </div>
              <div className="flex-grow-1 ms-3">
                <p className="h4 py-2 px-2 bg-light shadow-sm mt-2">
                  {post.Subject}
                </p>
                <div className="small mb-3">{Details}</div>
                <div className="small my-0">
                  <b>Category : </b>
                  <Link to={`/${post.Category}/posts`} className=" text-dark">
                    {post.Category}
                  </Link>
                </div>
                <div className="small">
                  <b>Tags : </b>
                  <span className="fst-italic">{post.Tags}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card">
              {post.Image != null && (
                <img
                  className="card-image img-fluid"
                  src={post.Image}
                  alt="..."
                />
              )}
              <div className="flex-grow-1 ms-3">
                <p className="h4 py-2 px-2 bg-light shadow-sm mt-2">
                  {post.Subject}
                </p>
                <div className="small mb-3">{Details}</div>
                <div className="small my-0">
                  <b>Category : </b>
                  <Link to={`/${post.Category}/posts`} className=" text-dark">
                    {post.Category}
                  </Link>
                </div>
                <div className="small">
                  <b>Tags : </b>
                  <span className="fst-italic">{post.Tags}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostContent;
