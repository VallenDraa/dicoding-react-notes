import PropTypes from "prop-types";
import React from "react";
import { Navbar } from "../../components/ui/navbar";
import { useNavigate } from "react-router-dom";

import "./new-note-page.css";

export function NewNotePage({ onAddNote }) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const navigate = useNavigate();

  function handleSaveNote() {
    if (!title || !body) {
      alert("Please fill in the title and body of the note.");
      return;
    }

    onAddNote(title, body);
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <section className="new-note__wrapper">
        <h2
          contentEditable
          suppressContentEditableWarning
          placeholder="untitled note..."
          className="new-note__input new-note__input--title"
          onInput={e => setTitle(e.target.innerHTML)}
        ></h2>
        <p
          contentEditable
          suppressContentEditableWarning
          placeholder="content of the note goes here."
          className="new-note__input new-note__input--content"
          onInput={e => setBody(e.target.innerHTML)}
        ></p>

        <div className="new-note__actions-wrapper">
          <div className="new-note__actions">
            <button
              title="save note."
              className="new-note__action"
              onClick={handleSaveNote}
            >
              <span>✅</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

NewNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
