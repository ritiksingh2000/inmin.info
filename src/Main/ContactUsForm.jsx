import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./ExtraComponents/Loading";

const ContactUsForm = () => {
  const [email, setEmail] = useState();
  const [FullName, setFullName] = useState();
  const [subject, setSubject] = useState();
  const [desc, setDesc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [successMesg, setSuccessMesg] = useState();
  const [errorMesg, setErrorMesg] = useState();

  const contact = async () => {
    setIsLoading(true);
    const dbRef = collection(db, "contactus");
    const saveContact = await addDoc(dbRef, {
      Email: email,
      FullName: FullName,
      Subject: subject,
      Description: desc,
      Date: Date(),
    })
      .then(() => {
        setSuccessMesg(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMesg(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {successMesg ? (
            <>
              <div className="card-body card">
                <div
                  className="alert alert-success text-center h3"
                  role="alert"
                >
                  Conact Message Sent Successfully.
                </div>
              </div>
            </>
          ) : (
            <>
              {errorMesg && (
                <>
                  <div className="card-body card">
                    <div
                      className="alert alert-success text-center h3"
                      role="alert"
                    >
                      {errorMesg}
                    </div>
                  </div>
                </>
              )}

              <div className="my-3 text-start shadow p-2 rounded bg-light">
                <label htmlFor="ContactEmail" className="form-label h5">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(ele) => setEmail(ele.target.value)}
                  className="form-control"
                  id="ContactEmail"
                />
              </div>

              <div className="my-3 text-start shadow p-2 rounded bg-light">
                <label htmlFor="Name" className="form-label h5">
                  Full Name
                </label>
                <input
                  type="text"
                  onChange={(ele) => setFullName(ele.target.value)}
                  className="form-control"
                  id="Name"
                />
              </div>
              <div className="my-3 text-start shadow p-2 rounded bg-light">
                <label htmlFor="Name" className="form-label h5">
                  Subject
                </label>
                <input
                  type="text"
                  onChange={(ele) => setSubject(ele.target.value)}
                  className="form-control"
                  id="subject"
                />
              </div>
              <div className="my-3 text-start shadow p-2 rounded bg-light">
                <label htmlFor="desc" className="form-label h5">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="desc"
                  onChange={(ele) => setDesc(ele.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <center>
                <button
                  onClick={contact}
                  className="btn btn-outline-dark px-4 btn-lg"
                >
                  Send
                </button>
              </center>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ContactUsForm;
