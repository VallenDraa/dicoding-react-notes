import "./note-page.css";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Navbar } from "../../components/ui/navbar";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../../utils/network-data";

export function NotePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [hasFetched, setHasFetched] = React.useState(false);
  const [note, setNote] = React.useState(null);
  const [error, setError] = React.useState(null);

  const fetchNote = React.useCallback(async () => {
    try {
      const noteData = await getNote(id);

      if (noteData.error) {
        setError("Fail to fetch note!");
        return;
      }

      setNote(noteData.data);
      setHasFetched(true);
    } catch (error) {
      setHasFetched(true);
      setError("Fail to fetch note!");
    }
  }, [id]);

  // Fetch the note data on initial load
  React.useEffect(() => {
    if (!hasFetched) {
      fetchNote();
    }
  }, [hasFetched, fetchNote]);

  function handleArchive() {
    if (note.archived) {
      unarchiveNote(id);
      navigate("/");
    } else {
      archiveNote(id);
      navigate("/archive");
    }
  }

  function handleDelete() {
    const isConfirmed = confirm("are you sure you want to delete this note?");

    if (isConfirmed) {
      deleteNote(id);
      navigate("/");
    }
  }

  return (
    <>
      <Navbar />

      {error ? (
        <section className="note__missing-wrapper">
          <h2 className="note__missing-title">can&apos;t fetch note data.</h2>
          <p className="note__missing-message">
            it seems that we can&apos;t fetch the note you were looking for!
          </p>
          <Link to="/" className="note__back-link">
            🏠return home
          </Link>
        </section>
      ) : note ? (
        <section className="note__wrapper">
          <div className="note__header">
            <Link to="/" className="note__back-link">
              &larr; back
            </Link>

            <h2
              className="note__title"
              dangerouslySetInnerHTML={{ __html: note.title }}
            ></h2>
            <time dateTime={note.createdAt} className="note__created-at">
              {new Date(note.createdAt).toLocaleString()}
            </time>
          </div>

          <p
            className="note__content"
            dangerouslySetInnerHTML={{ __html: note.body }}
          ></p>
          <span className="note__end-message">end of note.</span>

          <div className="note__actions-wrapper">
            <div className="note__actions">
              <button
                title={note.archived ? "unarchive" : "archive"}
                className="note__action"
                onClick={handleArchive}
              >
                <span>{note.archived ? "📂" : "📁"}</span>
              </button>
              <button
                title="delete"
                className="note__action"
                onClick={handleDelete}
              >
                <span>⛔</span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="note__missing-wrapper">
          <h2 className="note__missing-title">can&apos;t find note.</h2>
          <p className="note__missing-message">
            it seems that the note you were looking is missing!
          </p>
          <Link to="/" className="note__back-link">
            🏠return home
          </Link>
        </section>
      )}
    </>
  );
}
