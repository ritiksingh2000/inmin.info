import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllCategories, CurrentUser } from "../App";
import { db, storage } from "../firebase";
import Loading from "./ExtraComponents/Loading";
import RichTextEditor from "./ExtraComponents/RichTextEditor";

const AddPost = () => {
  const Categories = AllCategories();
  const User = CurrentUser();
  const [image, setImage] = useState(null);
  const [subject, setSubject] = useState(null);
  const [details, setDetails] = useState(null);
  const [tags, setTags] = useState();
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [ctgry, setCtgry] = useState();

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
                Category: ctgry,
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

  if (successMesg || errorMesg) {
    setTimeout(() => {
      setSuccessMesg();
      setErrorMesg();
    }, 3000);
  }

  return (
    <>
      <div className="container px-md-4">
        <div className="card card-body">
          <div className="card-header h3 text-center shadow-sm mb-3">
            Add New Post
          </div>
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
                <Loading />
              ) : (
                <>
                  <form className=" text-start bg-light p-3 rounded">
                    <div className="mb-3">
                      <label htmlFor="postImg" className="form-label">
                        Upoad An Image only
                      </label>
                      <input
                        accept="image/*"
                        className="form-control"
                        type="file"
                        id="formFile"
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
                    <select
                      className="form-select my-3"
                      onChange={(ele) => setCtgry(ele.target.value)}
                      aria-label="Default select example"
                    >
                      <option disabled>Select Post Category . . . </option>
                      {Categories.map((category) => (
                        <option key={category.id} value={category.Name}>
                          {category.Name}
                        </option>
                      ))}
                    </select>
                    <div className="mb-3">
                      <label htmlFor="details" className="form-label">
                        Details
                      </label>
                      <RichTextEditor ivalue={null} setDetails={setDetails} />
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
                        className="btn btn-dark mx-md-5 fs-4"
                        onClick={userAddPost}
                        type="reset"
                      >
                        Add Post
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddPost;
