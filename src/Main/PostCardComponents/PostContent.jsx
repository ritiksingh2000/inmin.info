import React, { useEffect, useState } from "react";

const PostContent = ({ post }) => {
  const [readStatus, setReadStatus] = useState("read more");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);
  const [pdLen, setPdLen] = useState(140);

  const readStatusHandel = () => {
    if (readStatus === "read more") {
      setReadStatus("read less");
      setPdLen();
    } else {
      setReadStatus("read more");
      setPdLen(140);
    }
  };
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
                <p className="h5 mt-2">{post.Subject}</p>
                <p className="small">
                  {post.Details.substring(0, pdLen)}{" "}
                  {post.Details.length > 140 && (
                    <>
                      <a
                        href={`#read/${post.id}`}
                        onClick={readStatusHandel}
                        className="link-primary small disabled"
                      >
                        {readStatus}
                      </a>
                    </>
                  )}
                </p>
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
                <p className="h5 mt-2">{post.Subject}</p>
                <p className="small">
                  {post.Details.substring(0, pdLen)}{" "}
                  {post.Details.length > 140 && (
                    <>
                      <a
                        href={`#read/${post.id}`}
                        onClick={readStatusHandel}
                        className="link-primary small disabled"
                      >
                        {readStatus}
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostContent;
