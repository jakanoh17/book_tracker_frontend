import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">
          Sorry! This page is missing from the library
        </p>
        <Link to="/" className="page-not-found__link">
          <button className="page-not-found__btn" type="button">
            Click here to go home
          </button>
        </Link>
      </div>
    </div>
  );
}
