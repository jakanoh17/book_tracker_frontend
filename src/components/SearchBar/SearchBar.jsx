// react elements
import { useState, useCallback } from "react";

export default function SearchBar({
  setCurrentBooks,
  setBooksLoading,
  setApiErrMsg,
  googleApi,
}) {
  const [searchInput, setSearchInput] = useState("harry potter");

  const getInfoFromGoogleApi = useCallback(() => {
    setBooksLoading(true);
    googleApi
      .getBookInfo(searchInput)
      .then((data) => {
        const workingArr = data.items;
        const books = workingArr.map((book) => {
          const { title, authors, description, imageLinks } = book.volumeInfo;
          return {
            id: book.id,
            title,
            author: authors,
            description,
            img: imageLinks.thumbnail,
          };
        });
        setCurrentBooks(books);
        localStorage.setItem("books", JSON.stringify(books));
        setBooksLoading(false);
      })
      .catch((err) => {
        console.error(err.status);
        if (err.includes("404")) {
          setApiErrMsg("Nothing found");
        }
        if (err.includes("500")) {
          setApiErrMsg(
            "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          );
        }
      });
  }, [searchInput, setCurrentBooks, setApiErrMsg, setBooksLoading]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      getInfoFromGoogleApi();
    },
    [getInfoFromGoogleApi]
  );

  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }

  // AUTOPOPULATE BOOKS
  // useEffect(() => {
  //   handleSubmit(new Event("submit"));
  // }, []);

  return (
    <form className="searchbar searchbar__container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar__input"
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit" className="searchbar__submit-btn"></button>
    </form>
  );
}
