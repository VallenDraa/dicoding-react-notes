import PropTypes from "prop-types";

export const NoteSearchbar = ({ keyword, onKeywordChange }) => {
  function handleKeywordChange(e) {
    onKeywordChange(e.target.value);
  }

  return (
    <input
      type="search"
      placeholder="search notes"
      value={keyword}
      onChange={handleKeywordChange}
    />
  );
};

NoteSearchbar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};
