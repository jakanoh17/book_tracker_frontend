export default function ShowMoreBtn({ handleBtnClick }) {
  return (
    <button
      className="show-more-btn show-more-btn_type_container"
      onClick={handleBtnClick}
    >
      Show More
    </button>
  );
}
