import "./notes-list.css";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../hooks";
import { notesListType, noteValidator } from "../../utils/validator";
import { NoteItem } from "../note-item";
import { NoteSearchbar } from "../note-searchbar";

export function NotesList({ type = "active", notes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [sortDesc, setSortDesc] = React.useState(true);

  const { user, isLoading } = useAuth();

  const filteredNotes = React.useMemo(() => {
    return notes
      .filter(note => note.title.includes(keyword))
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sortDesc) {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
  }, [keyword, notes, sortDesc]);

  return (
    <section>
      <div className="notes-list-header">
        <div className="notes-list-header__top">
          <h2>{`🗒️${!isLoading ? user.name : "xxxx"}'s ${type} notes`}</h2>
          <button
            className="notes-list-header__sort-button"
            onClick={() => setSortDesc(prev => !prev)}
          >
            {sortDesc ? "⬇️" : "⬆️"} sort
          </button>
        </div>
        <NoteSearchbar
          keyword={keyword}
          onKeywordChange={keyword => setSearchParams({ keyword })}
        />
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
        </>
      )}

      <div className="notes-list__actions-wrapper">
        <div className="notes-list__actions">
          <Link to="/new-note" title="add note" className="notes-list__action">
            &#x2B;
          </Link>
        </div>
      </div>
    </section>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  type: notesListType.isRequired,
};
