import PropTypes from "prop-types";
import React, { Component } from "react";
import { NoteSearchbar } from "../note-searchbar";
import { noteValidator } from "../../utils/validator";
import { getFilteredNotes } from "../../utils";
import { NoteItem } from "../note-item";
import "./notes-list.css";
import { Link } from "react-router-dom";

export class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredNotes: getFilteredNotes(
        props.notes,
        props.noteState,
        props.keyword,
      ),
    };
  }

  onKeywordChange = keyword => {
    this.props.onSearch(keyword);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.notes !== this.props.notes ||
      prevProps.keyword !== this.props.keyword
    ) {
      const newFilteredNotes = getFilteredNotes(
        this.props.notes,
        this.props.noteState,
        this.props.keyword,
      );

      this.setState({ filteredNotes: newFilteredNotes });
    }
  }

  render() {
    const { noteState, keyword } = this.props;
    const { filteredNotes } = this.state;

    return (
      <section>
        <div className="notes-list-header">
          <div className="notes-list-header__top">
            <h2>{`🗒️${noteState} notes`}</h2>
          </div>
          <NoteSearchbar
            keyword={keyword}
            onKeywordChange={this.onKeywordChange}
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
}

NotesList.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteValidator).isRequired,
  noteState: PropTypes.oneOf(["active", "archived"]).isRequired,
};
