import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUser } from "../App";
import { db, storage } from "../firebase";

const AddPost = () => {
  const User = CurrentUser();
  const [image, setImage] = useState(null);
  const [subject, setSubject] = useState(null);
  const [details, setDetails] = useState(null);
  const [tags, setTags] = useState();
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [isLoading, setisLoading] = useState(false);

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);
  const date = Date();

  const userAddPost = async () => {
    setSuccessMesg();
    setErrorMesg();
    setisLoading(true);
    if (image !== null) {
      const postImgRef = ref(
        storage,
        `PostsImages/${User.id}/${image[0].name}`
      );
      const UploadImage = await uploadBytes(postImgRef, image[0])
        .then(() => {
          getDownloadURL(postImgRef)
            .then(async (url) => {
              const postRef = collection(db, "posts");
              const createPost = await addDoc(postRef, {
                Subject: subject,
                Details: details,
                Image: url,
                Tags: tags,
                Likes: [],
                By: User,
                CreatedAt: date,
              })
                .then(() => {
                  setSuccessMesg("Post Added");
                  setisLoading(false);
                })
                .catch((err) => setErrorMesg(err));
            })
            .catch((err) => setErrorMesg(err));
        })
        .catch((err) => setErrorMesg(err));
    } else {
      const postRef = collection(db, "posts");
      const createPost = await addDoc(postRef, {
        Subject: subject,
        Details: details,
        Image: null,
        Tags: tags,
        By: User,
        Likes: [],
        CreatedAt: date,
      })
        .then(() => {
          setSuccessMesg("Post Added");
          setisLoading(false);
        })
        .catch((err) => setErrorMesg(err));
    }
  };

  return (
    <>
      {User === null ? (
        <>
          <div className="alert alert-warning shadow-sm" role="alert">
            <center>
              <b>Please Login To Post</b>
              <br />
              <Link
                to="/user/signup_login"
                className="btn btn-outline-dark shadow-sm btn-sm my-2"
              >
                Login - Signup
              </Link>
            </center>
          </div>
        </>
      ) : (
        <>
          {successMesg && (
            <div className="alert alert-success my-2" role="alert">
              {successMesg}
            </div>
          )}
          {errorMesg && (
            <div className="alert alert-danger my-2" role="alert">
              {errorMesg}
            </div>
          )}
          {isLoading ? (
            <>
              <center>
                <div className="spinner-border text-dark my-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </center>
            </>
          ) : (
            <>
              {screenSize > 768 ? (
                <>
                  <form className="small">
                    <div className="mb-3">
                      <label htmlFor="postImg" className="form-label">
                        Upoad An Image only
                      </label>
                      <input
                        accept="image/*"
                        className="form-control"
                        type="file"
                        id="postImg"
                        onChange={(ele) => setImage(ele.target.files)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="postTitle" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="postTitle"
                        onChange={(ele) => setSubject(ele.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label">
                        SpeakUp
                      </label>
                      <textarea
                        className="form-control"
                        id="details"
                        onChange={(ele) => setDetails(ele.target.value)}
                        required
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tags" className="form-label">
                        Add Tags
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tags"
                        onChange={(ele) => setTags(ele.target.value)}
                        aria-describedby="tags"
                      />
                      <div id="tags" className="form-text">
                        Seprate using comas.
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-dark mx-md-5"
                        onClick={userAddPost}
                        type="reset"
                      >
                        Add Post
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="collapse my-2" id="addPost">
                    <div className="card card-body">
                      <form className="small">
                        <div className="mb-3">
                          <label htmlFor="postImg" className="form-label">
                            Upoad An Image only
                          </label>
                          <input
                            accept="image/*"
                            className="form-control"
                            type="file"
                            id="postImg"
                            onChange={(ele) => setImage(ele.target.files)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="postTitle" className="form-label">
                            Subject
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="postTitle"
                            onChange={(ele) => setSubject(ele.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="details" className="form-label">
                            SpeakUp
                          </label>
                          <textarea
                            className="form-control"
                            id="details"
                            onChange={(ele) => setDetails(ele.target.value)}
                            required
                            rows="3"
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="tags" className="form-label">
                            Add Tags
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="tags"
                            onChange={(ele) => setTags(ele.target.value)}
                            aria-describedby="tags"
                          />
                          <div id="tags" className="form-text">
                            Seprate using comas.
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-dark mx-md-5"
                            onClick={userAddPost}
                            type="reset"
                          >
                            Add Post
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <p className="text-center py-2 my-0">
                    <button
                      className="btn btn-light shadow p-1 mx-1"
                      type="button"
                      data-bs-toggle="collapse"
                      id="addPostDropDown"
                      data-bs-target="#addPost"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <img src="https://img.icons8.com/material-rounded/20/000000/double-down.png" />
                    </button>
                  </p>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddPost;
