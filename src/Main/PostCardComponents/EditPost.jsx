import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import Loading from "../ExtraComponents/Loading";
import RichTextEditor from "../ExtraComponents/RichTextEditor";

const EditPost = () => {
  const location = useLocation();

  const post = location.state[0];
  const User = location.state[1];

  const styletextarea = { height: "150px" };
  const [img, setImg] = useState(null);
  const [subject, setSubject] = useState(post.Subject);
  const [details, setDetails] = useState(post.Details);
  const [tags, setTags] = useState(post.Tags);
  const [isLoading, setIsLoading] = useState(false);
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const date = Date();
  const navigate = useNavigate();

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

  const deletePOst = async (postID) => {
    await deleteDoc(doc(db, "posts", postID));
    window.location.replace(window.location.href);
  };

  if (successMesg || errorMesg) {
    setTimeout(() => {
      setSuccessMesg();
      setErrorMesg();
    }, 3000);
  }

  return (
    <>
      <div className="container my-3 px-md-4">
        <div className="card card-body">
          <div className="card-header h3 text-center shadow-sm mb-3">
            Add New Post
          </div>

          {isLoading ? (
            <Loading />
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
                  <div className="card-body">
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
                      <RichTextEditor
                        ivalue={post.Details}
                        setDetails={setDetails}
                      />
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
                      <button
                        className="btn btn-danger mx-md-5"
                        onClick={() => deletePOst(post.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPost;
