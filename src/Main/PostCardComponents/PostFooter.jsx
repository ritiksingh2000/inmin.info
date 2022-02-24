import React from "react";
import Comments from "./Comments";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
          <div className="col-6 mx-auto d-flex justify-content-center">
            <button className="btn btn-outline-dark btn-sm" onClick={AddLike}>
              {" "}
              {post.Likes.length} Likes
            </button>
          </div>
          <div className="col-6 mx-auto d-flex justify-content-center">
            <Comments post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFooter;
