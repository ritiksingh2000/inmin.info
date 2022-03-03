import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { CurrentUser, PostsComments } from "../../App";
import { db } from "../../firebase";

const Comments = ({ post }) => {
  const AllComments = PostsComments();
  const PostComments = AllComments.filter((com) => post.id === com.post);
  const User = CurrentUser();
  const [comment, setComment] = useState();
  const addComment = async () => {
    console.log(User, Date());
    // document.getElementById("CommentForm").reset();
    // await addDoc(collection(db, "postComments"), {
    //   from: User,
    //   post: post.id,
    //   Comment: comment,
    //   AddedOn: Date(),
    // });
  };

  return (
    <>
      <button
        className="btn btn-outline-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#commentsModal${post.id}`}
      >
        Comments
      </button>

      <div
        className="modal fade"
        id={`commentsModal${post.id}`}
        tabIndex="-1"
        aria-labelledby={`commentsModal${post.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg  ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`commentsModal${post.id}`}>
                <b>{post.Subject} </b> Comments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {PostComments.length > 0 ? (
                <>
                  {PostComments.map((comment) => (
                    <div className="card mb-3" key={comment.id}>
                      <div className="card-header shadow-sm p-2">
                        <p className="small m-0 p-0">
                          <img
                            src={comment.from.Image}
                            alt="..."
                            width="28px"
                          />
                          {"  " + comment.from.Username} -{" "}
                          <span className="text-muted fst-italic">
                            {comment.AddedOn.substring(0, 21)}
                          </span>
                        </p>
                      </div>
                      <div className="card-body">
                        <p className="small">{comment.Comment}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <center>
                  <div className="alert alert-info" role="alert">
                    No Comments on the post yet.
                  </div>
                </center>
              )}
            </div>
            <div className="modal-footer">
              {User === null ? (
                <>
                  <div className="alert alert-warning" role="alert">
                    Please Login or Signup to write a comment.
                  </div>
                </>
              ) : (
                <>
                  <div className="row g-0">
                    <div className="col-md-1 col-2 p-1">
                      <img src={User.Image} alt="..." width="48px" />
                    </div>
                    <div className="col-10 col-md-11 p-1">
                      <form id="CommentForm">
                        <textarea
                          placeholder="Write Your Comment . . ."
                          rows="4"
                          onChange={(ele) => setComment(ele.target.value)}
                          cols="1000"
                          className="form-control"
                        ></textarea>
                        <div className="d-grid gap-2 my-2 px-md-5 px-3 block">
                          <button
                            onClick={addComment}
                            className="btn btn-outline-dark"
                            type="button"
                          >
                            Add Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
