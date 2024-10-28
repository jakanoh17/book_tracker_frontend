// Modules
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Files
import "../../index.css";
import Header from "../Header/Header";
import BookSection from "../BookSection/BookSection";
import SearchBar from "../SearchBar/SearchBar";
import BookCard from "../BookCard/BookCard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AuthFormModal from "../AuthFormModal/AuthFormModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ModalWithoutForm from "../ModalWithoutForm/ModalWithoutForm";
import PageNotFound from "../404NotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";

// API
import GoogleBooksApi from "../../utils/GoogleBooksApi";
const googleApi = new GoogleBooksApi(
  "https://www.googleapis.com",
  "AIzaSyBWUdrb__jKymL6j7z7XQoYqJGIHCmeFWM"
);

function App() {
  // LOADING VARIABLES
  const [appLoading, setAppLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(false);
  const [apiErrMsg, setApiErrMsg] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [bookPopupInfo, setBookPopupInfo] = useState({
    title: "",
    author: "",
    description: "",
    img: "",
  });
  const [currentBooks, setCurrentBooks] = useState([]);
  const [displayedBooksEndIndex, setDisplayedBooksEndIndex] = useState(3);

  // Load books in localStorage
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) setCurrentBooks(JSON.parse(storedBooks));
  }, []);

  // OPEN MODALS
  function openLoginModal() {
    setActiveModal("login");
  }

  function openSignupModal() {
    setActiveModal("signup");
  }

  function openBookDescrPopup() {
    setActiveModal("book-popup");
  }

  // CLOSE MODALS
  function closeModal() {
    setActiveModal("");
  }

  function closeModalOnEsc(e) {
    if (e.target === "Escape") closeModal();
  }

  function closeModalOnOutsideClk(e) {
    if ([...e.target.classList].includes("modal_open")) closeModal();
  }

  // Change book display
  function changeDisplayBooks() {
    setDisplayedBooksEndIndex(displayedBooksEndIndex + 3);
  }

  // PRELOADER
  useEffect(() => {
    const timeout = setTimeout(() => setAppLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (appLoading) {
    return <Preloader />;
  }

  return (
    <div className="page" onKeyDown={closeModalOnEsc}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero-section">
                <Header
                  loggedIn={loggedIn}
                  openLoginModal={openLoginModal}
                  openSignupModal={openSignupModal}
                />
                <SearchBar
                  setCurrentBooks={setCurrentBooks}
                  setBooksLoading={setBooksLoading}
                  setApiErrMsg={setApiErrMsg}
                  googleApi={googleApi}
                />
              </section>
              <BookSection title="Search Results">
                {currentBooks.length > 0 ? (
                  currentBooks.slice(0, displayedBooksEndIndex).map((book) => {
                    const { id, title, author, description, img } = book;
                    return (
                      <BookCard
                        key={id}
                        title={title}
                        author={author}
                        description={description}
                        img={img}
                        openPopupModal={openBookDescrPopup}
                        setBookPopupInfo={setBookPopupInfo}
                        booksLoading={booksLoading}
                      />
                    );
                  })
                ) : (
                  <p>{apiErrMsg}</p>
                )}
              </BookSection>
              {displayedBooksEndIndex + 1 < currentBooks.length && (
                <ShowMoreBtn handleBtnClick={changeDisplayBooks} />
              )}
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <BookSection title="Want To Read" page="profile">
                {/* <BookCard bookTitle="help!!!!!!!!!!!!!!!" /> */}
              </BookSection>
              <BookSection title="Currently Reading" page="profile">
                {/* <BookCard bookTitle="help!!!!!!!!!!!!!!!" /> */}
              </BookSection>
              <BookSection title="Already Read" page="profile">
                {/* <BookCard bookTitle="help!!!!!!!!!!!!!!!" /> */}
              </BookSection>
            </ProtectedRoute>
          }
        />
        <Route
          path="/404-not-found"
          element={
            <>
              <Header
                loggedIn={loggedIn}
                openLoginModal={openLoginModal}
                openSignupModal={openSignupModal}
              />
              <PageNotFound />
            </>
          }
        />
      </Routes>
      <ModalWithForm
        title="Login"
        isOpen={activeModal === "login"}
        closeModal={closeModal}
        closeOnOutsideClk={closeModalOnOutsideClk}
      >
        <AuthFormModal emailName="loginEmail" passwordName="loginPassword" />
      </ModalWithForm>
      <ModalWithForm
        title="Signup"
        isOpen={activeModal === "signup"}
        closeModal={closeModal}
        closeOnOutsideClk={closeModalOnOutsideClk}
      >
        <AuthFormModal emailName="signupEmail" passwordName="signupPassword" />
      </ModalWithForm>
      <ModalWithoutForm
        isOpen={activeModal === "book-popup"}
        closeModal={closeModal}
        closeOnOutsideClk={closeModalOnOutsideClk}
        bookTitle={bookPopupInfo.title}
        bookAuthor={bookPopupInfo.author}
        bookDescr={bookPopupInfo.description}
        bookImg={bookPopupInfo.img}
      />
    </div>
  );
}

export default App;
