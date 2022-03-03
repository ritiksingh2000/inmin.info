import React from "react";
import paypalLogo from "./imgs/paypalLogo.png";
import stripeLogo from "./imgs/stripe.png";

const Donate = () => {
  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-body">
          <div className="card-header shadow my-2 text-center h2 bg-light">
            Donate to inmin.info Using . . .
          </div>
        </div>
        <div className="card-body my-3">
          <div className="d-grid gap-2 px-md-5">
            <button
              type="button"
              className="btn btn-dark btn-lg shadow-sm mx-md-5"
              data-bs-toggle="modal"
              data-bs-target="#paypalDonate"
            >
              <img
                src={paypalLogo}
                alt="..."
                className="img-fluid"
                width="200px"
              />
            </button>
            <button
              type="button"
              className="btn btn-dark btn-lg shadow-sm mx-md-5"
              data-bs-toggle="modal"
              data-bs-target="#stripeDonate"
            >
              <img
                src={stripeLogo}
                alt="..."
                className="img-fluid"
                width="150px"
              />
            </button>
          </div>

          <div
            className="modal fade"
            id="paypalDonate"
            tabIndex="-1"
            aria-labelledby="paypalDonate"
            aria-hidden="true"
          >
            <div className="modal-dialog        ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="paypalDonate">
                    Paypal Donation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="stripeDonate"
            tabIndex="-1"
            aria-labelledby="stripeDonate"
            aria-hidden="true"
          >
            <div className="modal-dialog        ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="stripeDonate">
                    Stripe Donation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
