// Packages
import { Link } from "react-router-dom";

// Files
import logo from "../../assets/LitHavenLogo.png";

function Header({ loggedIn, openLoginModal, openSignupModal }) {
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="Lit Haven Logo" className="header__logo" />
      </Link>
      {/* This button needs to open up a modal that will allow the user to login or signup */}
      {!loggedIn && (
        <div className="header__auth-btns">
          <button
            className="header__auth-btn"
            type="button"
            onClick={openLoginModal}
          >
            Login
          </button>
          <button
            className="header__auth-btn"
            type="button"
            onClick={openSignupModal}
          >
            Signup
          </button>
        </div>
      )}
      {loggedIn && (
        <button className="header__dropdown">
          <img src="" alt="Profile picture" className="header__avatar" />
        </button>
      )}
    </header>
  );
}

export default Header;
