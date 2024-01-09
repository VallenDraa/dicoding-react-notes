import "./notes-list.css";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { notesListType, noteValidator } from "../../utils/validator";
import { NoteItem } from "../note-item";
import { NoteSearchbar } from "../note-searchbar";

export function NotesList({ keyword, onSearch, notes, type = "active" }) {
  const [filteredNotes] = React.useState(notes);

  return (
    <section>
      <div className="notes-list-header">
        <div className="notes-list-header__top">
          <h2>{`🗒️${type} notes`}</h2>
        </div>
        <NoteSearchbar keyword={keyword} onKeywordChange={onSearch} />
      </div>

      {filteredNotes.length === 0 ? (
        <p className="notes-list__empty-message">no notes here 🙅</p>
      ) : (
        <>
          <ul className="notes-list">
            {filteredNotes.map(note => (
              <NoteItem key={note.id} note={note} />
            ))}
          </ul>
          <span className="notes-list__end-message">end of note list.</span>

          <div className="notes-list__actions-wrapper">
            <div className="notes-list__actions">
              <Link
                to="/new-note"
                title="add note"
                className="notes-list__action"
              >
                <span>&#x2B;</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

NotesList.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  type: notesListType.isRequired,
};
