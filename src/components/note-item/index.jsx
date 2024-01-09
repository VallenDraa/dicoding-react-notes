import "./note-item.css";

import { Link } from "react-router-dom";

import { showFormattedDate } from "../../utils/formatter";
import { noteValidator } from "../../utils/validator";

export const NoteItem = ({ note }) => {
  const { id, title, body, archived, createdAt } = note;

  return (
    <li
      className={`note-item ${archived ? "note-item--archived" : ""}`.trimEnd()}
    >
      <div className="note-item__content">
        <h3
          className="note-item__title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        <span className="note-item__date">{showFormattedDate(createdAt)}</span>
        <p
          className="note-item__body"
          dangerouslySetInnerHTML={{ __html: body }}
        ></p>
      </div>

      <Link to={`/note/${id}`} className="note-item__details-button">
        📖 details
      </Link>
    </li>
  );
};

NoteItem.propTypes = {
  note: noteValidator.isRequired,
};
