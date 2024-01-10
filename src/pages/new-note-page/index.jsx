import "./new-note-page.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components/ui/navbar";
import { useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";
import { addNote } from "../../utils/network-data";

export function NewNotePage() {
  const { locale } = useLocale();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  async function handleSaveNote() {
    if (!title || !body) {
      alert(LOCALE_DATA[locale].newNotePage.errorAlert);
      return;
    }

    await addNote({ title, body });
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <section className="new-note__wrapper">
        <h2
          contentEditable
          suppressContentEditableWarning
          placeholder={LOCALE_DATA[locale].newNotePage.titlePlaceholder}
          className="new-note__input new-note__input--title"
          onInput={e => setTitle(e.target.innerHTML)}
        ></h2>
        <p
          contentEditable
          suppressContentEditableWarning
          placeholder={LOCALE_DATA[locale].newNotePage.contentPlaceholder}
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
