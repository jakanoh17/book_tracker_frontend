export default function BookCard({
  title,
  author,
  description,
  img,
  openPopupModal,
  setBookPopupInfo,
}) {
  function openPopup(e) {
    if ([...e.target.classList].includes("book__overlay")) {
      openPopupModal();
      setBookPopupInfo({
        title,
        author,
        description,
        img,
      });
    }
  }

  return (
    <li className="book" onClick={openPopup}>
      <img src={img} alt={title} className="book__img" />
      <div className="book__overlay">
        <div className="book__background-btns">
          <button
            className="book__background-btn book__background-btn_type_wishlist"
            type="button"
          ></button>
          <button
            className="book__background-btn book__background-btn_type_reading-btn"
            type="button"
          ></button>
          <button
            className="book__background-btn book__background-btn_type_finished-btn"
            type="button"
          ></button>
        </div>
        <h3 className="book__title">{title}</h3>
      </div>
    </li>
  );
}
