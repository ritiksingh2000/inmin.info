import React, { useEffect, useState } from "react";
import { CurrentUser } from "../App";
import PostContent from "./PostCardComponents/PostContent";
import PostFooter from "./PostCardComponents/PostFooter";
import PostHeader from "./PostCardComponents/PostHeader";

const PostCard = ({ post }) => {
  const [warning, setWarning] = useState();
  const User = CurrentUser();

  return (
    <>
      <div className="card my-3 shadow" id={post.id}>
        <PostHeader post={post} User={User} />
        <PostContent post={post} />
        <PostFooter post={post} setWarning={setWarning} User={User} />
      </div>
      {warning && (
        <>
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong> {warning}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      )}
    </>
  );
};

export default PostCard;
