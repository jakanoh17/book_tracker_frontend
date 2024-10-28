export default function ModalWithForm({
  title,
  isOpen,
  closeModal,
  children,
  closeOnOutsideClk,
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
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
