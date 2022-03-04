import React from "react";
import Comments from "./Comments";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import like from "../imgs/like.png";
import share from "../imgs/share.png";
import { RWebShare } from "react-web-share";

const PostFooter = ({ post, User, setWarning }) => {
  const AddLike = async () => {
    if (User === null) {
      setWarning("Login Or Signup to Like");
    } else {
      const LikesIds = post.Likes.map((id) => id.by);
      if (LikesIds.includes(User.id)) {
        const postRef = doc(db, "posts", post.id);
        const removeLike = post.Likes.filter((like) => like.by !== User.id);

        const updatePost = await updateDoc(postRef, {
          Likes: removeLike,
        });
      } else {
        const postRef = doc(db, "posts", post.id);
        if (post.Likes.length > 1) {
          const updatePost = await updateDoc(postRef, {
            Likes: [...post.Likes, { by: User.id }],
          });
        } else {
          const updatePost = await updateDoc(postRef, {
            Likes: [{ by: User.id }],
          });
        }
      }
    }
  };
  return (
    <>
      <div className="card-footer  shadow-sm py-1 px-0">
        <div className="row">
          <div className="col-4 mx-auto d-flex justify-content-center">
            <button
              className="btn btn-light btn-sm py-0 fw-bold"
              onClick={AddLike}
            >
              {" "}
              {post.Likes.length}{" "}
              <img
                src={like}
                alt="Likes"
                className="img-fluid pb-1"
                width="18px"
              />
            </button>
          </div>
          <div className="col-4 mx-auto d-flex justify-content-center">
            <Comments post={post} />
          </div>
          <div className="col-4 mx-auto d-flex justify-content-center">
            <button className="btn btn-light py-0 btn-sm">
              <RWebShare
                data={{
                  text: post.Subject,
                  url: `http://localhost:3000/shared/${post.id}`,
                  // url: `https://inmin-info.herokuapp.com/shared/${post.id}`,
                  title: post.Subject,
                }}
              >
                <img
                  src={share}
                  alt="Share"
                  className="img-fluid "
                  width="18px"
                />
              </RWebShare>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFooter;
