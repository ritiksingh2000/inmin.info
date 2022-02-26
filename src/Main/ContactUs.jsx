import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactUsForm from "./ContactUsForm";
import logoImg from "./imgs/logo.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const ContactUs = () => {
  return (
    <>
      <div className="container">
        <div className="row g-0">
          <div className="col-md-10 mx-auto">
            <div className="card card-body">
              <div className="card-header shadow text-center h3">
                <center>
                  <img src={logoImg} alt="..." width="46px" id="logoImg" />
                  <Link
                    to="/"
                    className="text-dark text-decoration-none"
                    id="MainLogo"
                  >
                    {" "}
                    inmin.info <br />
                  </Link>
                </center>
              </div>

              <div className="card-body shadow text-center px-md-5">
                <div className="card-header">
                  <h3 className="text-center">Contact Us Form</h3>
                  <p className="text-center small pb-0 mb-0">
                    Ask us about your doubts and we will email you back the
                    answers as soon as possible.
                  </p>
                </div>

                <br />

                <div className="px-md-5">
                  <ContactUsForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
