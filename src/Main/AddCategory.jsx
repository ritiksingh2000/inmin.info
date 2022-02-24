import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../App";
import { db, storage } from "../firebase";

const AddCategory = () => {
  const navigate = useNavigate();
  const currentUser = CurrentUser();
  const [User, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setUser(currentUser);

    if (currentUser !== null) {
      if (currentUser.isAdmin === true) {
        setIsLoading(false);
      } else {
        navigate("/");
      }
    }
  }, [currentUser]);

  const [ctgImg, setCtgImg] = useState(null);
  const [ctgName, setCtgName] = useState(null);
  const [ctgDesc, setCtgDesc] = useState(null);
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();
  const [creating, setCreating] = useState(false);

  const CreateCategory = async () => {
    setCreating(true);
    const CtgImgRef = ref(storage, `Category_Images/${ctgImg[0].name}`);
    await uploadBytes(CtgImgRef, ctgImg[0])
      .then(() => {
        getDownloadURL(CtgImgRef).then(async (url) => {
          const CategoryRef = collection(db, "category");
          console.log(url, ctgImg[0], ctgName, ctgDesc);
          const Create = await addDoc(CategoryRef, {
            Image: url,
            Name: ctgName,
            Description: ctgDesc,
          })
            .then(() => {
              setSuccessMesg("Category Created Successfully");
              setCreating(false);
            })
            .catch((err) => {
              setErrorMesg(err);
              setCreating(true);
            });
        });
      })
      .catch((err) => {
        setErrorMesg(err);
        setCreating(false);
      });
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-md-9 mx-auto my-3 p-3">
          <div className="card card-body">
            {isLoading && (
              <>
                <center>
                  <button
                    className="btn bg-white btn-light px-3 py-2 h3"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {"  "}Loading. . .
                  </button>
                </center>
              </>
            )}
            {User !== null && isLoading === false ? (
              <>
                <div className="card-header h2 text-center">
                  Create Category
                </div>
                <div className="card-body">
                  {errorMesg && (
                    <>
                      <div
                        className="alert alert-danger text-center h4"
                        role="alert"
                      >
                        {errorMesg}
                      </div>
                    </>
                  )}
                  {successMesg && (
                    <>
                      <div
                        className="alert alert-success text-center h4"
                        role="alert"
                      >
                        {successMesg}
                      </div>
                    </>
                  )}
                  {creating === true ? (
                    <>
                      <button
                        className="btn btn-success"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating Category . . .
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="my-3">
                        <label htmlFor="ctgryImg" className="form-label">
                          Category Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(ele) => setCtgImg(ele.target.files)}
                          accept="image/*"
                          id="ctgryImg"
                        />
                      </div>
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(ele) => setCtgName(ele.target.value)}
                          id="ctgName"
                          placeholder="Category Name"
                        />
                        <label htmlFor="ctgName">Category Name</label>
                      </div>
                      <div className="form-floating my-3">
                        <textarea
                          className="form-control"
                          onChange={(ele) => setCtgDesc(ele.target.value)}
                          placeholder="description....."
                          id="ctgdesc"
                        ></textarea>
                        <label htmlFor="ctgdesc">Describe Category</label>
                      </div>
                      <center>
                        <button
                          className=" mt-3 btn btn-outline-dark"
                          onClick={CreateCategory}
                        >
                          Add Category
                        </button>
                      </center>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <center>
                  <button
                    className="btn bg-white btn-light px-3 py-2 h3"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {"  "} Please Login to access. redirecting. . .
                  </button>
                </center>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
