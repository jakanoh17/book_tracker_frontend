// Packages
import { Link } from "react-router-dom";

// Files
import logo from "../../assets/LitHavenLogo.png";

function Header({ loggedIn, openLoginModal, openSignupModal, handleLogout }) {
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="Lit Haven Logo" className="header__logo" />
      </Link>
      {/* This button needs to open up a modal that will allow the user to login or signup */}
      {!loggedIn && (
        <div className="header__btns">
          <button
            className="header__btn"
            type="button"
            onClick={openLoginModal}
          >
            Login
          </button>
          <button
            className="header__btn"
            type="button"
            onClick={openSignupModal}
          >
            Signup
          </button>
        </div>
      )}
      {loggedIn && (
        <div className="header__profile">
          <Link to="/profile">
            <button type="button" className="header__btn">
              My Profile
            </button>
          </Link>
          <div className="dropdown dropdown_visible">
            <button
              type="button"
              className="dropdown__option"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
