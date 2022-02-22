import React from "react";
import { Link } from "react-router-dom";
import logoImg from "./logo.png";

const Footer = () => {
  return (
    <footer className="container py-4">
      <center>
        <img src={logoImg} alt="..." width="46px" id="logoImg" />
        <Link
          to="/"
          className="text-white text-decoration-none my-0 py-0 text-center"
          id="MainLogo"
        >
          {" "}
          inmin.info <br />
        </Link>
        <p className="py-3 text-small text-white border-2 border-top border-white">
          Copyright &copy; inmin.info | 2022 By Ritik Singh
        </p>
      </center>
    </footer>
  );
};

export default Footer;
