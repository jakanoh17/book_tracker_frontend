export default function ModalWithoutForm({
  isOpen,
  closeModal,
  closeOnOutsideClk,
  bookTitle,
  bookAuthor,
  bookDescr,
  bookImg,
}) {
  return (
    <section
      className={`modal${isOpen ? " modal_open" : ""}`}
      onClick={closeOnOutsideClk}
    >
      <div className="modal__form-container">
        <button
          className="modal__close-btn"
          type="button"
          onClick={closeModal}
        ></button>
        <div className="book-popup">
          <div className="book-popup_placement_left">
            <img src={bookImg} alt={bookTitle} className="book-popup__img" />
          </div>
          <div className="book-popup__divider"></div>
          <div className="book-popup_placement_right">
            <h2 className="book-popup__title">{bookTitle}</h2>
            <h3 className="book-popup__author">By {bookAuthor}</h3>
            <p className="book-popup__text">{bookDescr}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
