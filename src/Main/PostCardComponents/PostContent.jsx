import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";

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
                    className="img-thumbnail"
                    alt="..."
                  />
                )}
              </div>
              <div className="flex-grow-1 ms-3">
                <p className="h4 py-2 px-2 bg-light shadow-sm mt-2">
                  {post.Subject}
                </p>
                <p className="small">{Details}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card">
              {post.Image != null && (
                <img
                  className="card-image img-thumbnail shadow-sm"
                  src={post.Image}
                  alt="..."
                />
              )}
              <div className="flex-grow-1 ms-3">
                <p className="h4 py-2 px-2 bg-light shadow-sm mt-2">
                  {post.Subject}
                </p>
                <p className="small">{Details}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostContent;
