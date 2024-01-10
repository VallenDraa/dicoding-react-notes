import PropTypes from "prop-types";

import { useLocale } from "../hooks";
import { LOCALE_DATA } from "../utils/locale-data";

export const NoteSearchbar = ({ keyword, onKeywordChange }) => {
  const { locale } = useLocale();

  function handleKeywordChange(e) {
    onKeywordChange(e.target.value);
  }

  return (
    <input
      type="search"
      placeholder={LOCALE_DATA[locale].noteSearchBar.placeholder}
      value={keyword}
      onChange={handleKeywordChange}
    />
  );
};

NoteSearchbar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};
