import "./note-item.css";

import parse from "html-react-parser";
import { Link } from "react-router-dom";

import { useLocale } from "../../hooks";
import { showFormattedDate } from "../../utils/formatter";
import { LOCALE_DATA } from "../../utils/locale-data";
import { noteValidator } from "../../utils/validator";

export const NoteItem = ({ note }) => {
  const { id, title, body, archived, createdAt } = note;

  const { locale } = useLocale();

  return (
    <li
      className={`note-item ${archived ? "note-item--archived" : ""}`.trimEnd()}
    >
      <div className="note-item__content">
        <h3 className="note-item__title">{parse(title)}</h3>
        <span className="note-item__date">{showFormattedDate(createdAt)}</span>
        <div className="note-item__body">{parse(body)}</div>
      </div>

      <Link to={`/note/${id}`} className="note-item__details-button">
        {`📖 ${LOCALE_DATA[locale].noteItem.details}`}
      </Link>
    </li>
  );
};

NoteItem.propTypes = {
  note: noteValidator.isRequired,
};
