import Preloader from "../Preloader/Preloader";

export default function BookSection({ children, title, page, booksLoading }) {
  return (
    <section className="book-section">
      <div className="book-section__header">
        <h1 className="book-section__title">{title}</h1>{" "}
        <div className="book-section__divider"></div>
      </div>
      <div
        className={`book-section__books${
          page ? ` book-section__books_page_${page}` : ""
        }`}
      >
        {booksLoading ? <Preloader /> : children}
      </div>
    </section>
  );
}
