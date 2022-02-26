import React from "react";
import { Link } from "react-router-dom";
import logoImg from "./imgs/logo.png";
const AboutUs = () => {
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur assumenda fugiat, neque maxime, aut incidunt earum
                  odio eum repellendus officiis culpa voluptate temporibus, nisi
                  placeat fuga cum pariatur numquam praesentium.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur assumenda fugiat, neque maxime, aut incidunt earum
                  odio eum repellendus officiis culpa voluptate temporibus, nisi
                  placeat fuga cum pariatur numquam praesentium.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur assumenda fugiat, neque maxime, aut incidunt earum
                  odio eum repellendus officiis culpa voluptate temporibus, nisi
                  placeat fuga cum pariatur numquam praesentium.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur assumenda fugiat, neque maxime, aut incidunt earum
                  odio eum repellendus officiis culpa voluptate temporibus, nisi
                  placeat fuga cum pariatur numquam praesentium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
