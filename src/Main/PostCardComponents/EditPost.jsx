import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../firebase";

const EditPost = ({ post, User }) => {
  const styletextarea = { height: "150px" };
  const [img, setImg] = useState(null);
  const [subject, setSubject] = useState(post.Subject);
  const [details, setDetails] = useState(post.Details);
  const [tags, setTags] = useState(post.Tags);
  const [isLoading, setIsLoading] = useState(false);
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const date = Date();

  const UpdatePost = async () => {
    setIsLoading(true);
    const postRef = doc(db, "posts", post.id);
    if (img === null) {
      const PostUpdate = await updateDoc(postRef, {
        Subject: subject,
        Details: details,
        CreatedAt: date,
        Tags: tags,
      }).then(() => {
        setIsLoading(false);
        setSuccessMesg("Post Updated.");
      });
    } else {
      const postImgRef = ref(storage, `PostsImages/${User.id}/${img.name}`);
      const UploadImage = await uploadBytes(postImgRef, img)
        .then(() => {
          getDownloadURL(postImgRef)
            .then(async (url) => {
              const PostUpdate = await updateDoc(postRef, {
                Image: url,
                Subject: subject,
                Details: details,
                CreatedAt: date,
                Tags: tags,
              }).then(() => {
                setIsLoading(false);
                setSuccessMesg("Post Updated.");
              });
            })
            .catch((err) => setErrorMesg(err));
        })
        .catch((err) => setErrorMesg(err));
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark btn-sm shadow-sm  px-1 py-0"
        data-bs-toggle="modal"
        data-bs-target={`#editPost${post.id}`}
      >
        🖊
      </button>
      {"  "}
      <div
        className="modal fade"
        id={`editPost${post.id}`}
        tabIndex="-1"
        aria-labelledby="reportPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reportPost">
                <b className="text-dark">Update : </b>{" "}
                <small className="fst-italic">{post.Subject}</small>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {isLoading ? (
              <>
                <center>
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Updating...</span>
                  </div>
                </center>
              </>
            ) : (
              <>
                {successMesg ? (
                  <>
                    <div className="alert alert-success" role="alert">
                      <p className="h5 text-center">{successMesg}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {errorMesg && (
                      <>
                        <div className="alert alert-danger" role="alert">
                          <p className="h4 text-center">{errorMesg}</p>
                        </div>
                      </>
                    )}
                    <div className="modal-body">
                      <div className="mb-3">
                        <p className="text-start h6 mb-1 mt-0">New Image</p>
                        <input
                          className="form-control"
                          accept="image/*"
                          type="file"
                          onChange={(ele) => setImg(ele.target.files[0])}
                          id="img"
                        />
                      </div>
                      <div className="my-3 shadow-sm">
                        <p className="text-start h6 mb-1 mt-0">Subject</p>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(ele) => setSubject(ele.target.value)}
                          id="sub"
                          defaultValue={post.Subject}
                        />
                      </div>
                      <div className="my-3 shadow-sm">
                        <p className="text-start h6 mb-1 mt-0">Details</p>
                        <textarea
                          className="form-control "
                          defaultValue={post.Details}
                          onChange={(ele) => setDetails(ele.target.value)}
                          id="Details"
                          style={styletextarea}
                        ></textarea>
                      </div>
                      <div className="my-3 shadow-sm">
                        <p className="text-start h6 mb-1 mt-0">Tags</p>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(ele) => setTags(ele.target.value)}
                          id="tags"
                          defaultValue={post.Tags}
                        />
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-outline-dark mx-md-5"
                          onClick={UpdatePost}
                          type="button"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
