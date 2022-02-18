import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container py-4">
      <center>
        <Link
          to="/"
          className="text-decoration-none text-white fw-bold"
          id="MainLogo"
        >
          inmin.info
        </Link>
        <p className="py-3 text-small text-white border-2 border-top border-white">
          Copyright &copy; inmin.info | 2022 By Ritik Singh
        </p>
      </center>
    </footer>
  );
};

export default Footer;
