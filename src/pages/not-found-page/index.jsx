import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/ui/navbar";
import "./not-found-page.css";

export function NotFoundPage() {
  return (
    <>
      <Navbar />
      <section className="not-found__wrapper">
        <h2 className="not-found__title">error 404.</h2>
        <p className="not-found__message">
          it seems that the page you were looking is missing!
        </p>
        <Link to="/" className="not-found__back-link">
          🏠return home
        </Link>
      </section>
    </>
  );
}
