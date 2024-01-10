import "./note-page.css";

import parse from "html-react-parser";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { CustomSkeleton } from "../../components/custom-skeleton";
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
        <section className="note__alert-wrapper">
          <h2 className="note__alert-title">⚠️</h2>
          <p className="note__alert-message">
            can&apos;t fetch the note you were looking for!
          </p>
          <Link to="/" className="note__back-link">
            🏠return home
          </Link>
        </section>
      ) : !note && hasFetched ? (
        <section className="note__alert-wrapper">
          <h2 className="note__alert-title">⚠️</h2>
          <p className="note__alert-message">
            the note you were looking is missing!
          </p>
          <Link to="/" className="note__back-link">
            🏠return home
          </Link>
        </section>
      ) : (
        <section className="note__wrapper">
          <div className="note__header">
            <Link to="/" className="note__back-link">
              &larr; back
            </Link>

            <h2 className="note__title">
              {hasFetched ? parse(note?.title ?? "") : <CustomSkeleton />}
            </h2>
            <time dateTime={note?.createdAt} className="note__created-at">
              {hasFetched ? (
                new Date(note?.createdAt).toLocaleString()
              ) : (
                <CustomSkeleton />
              )}
            </time>
          </div>

          <div className="note__content">
            {hasFetched ? (
              parse(note?.body ?? "")
            ) : (
              <CustomSkeleton count={5} height={50} />
            )}
          </div>
          <span className="note__end-message">
            {hasFetched ? "end of note." : <CustomSkeleton />}
          </span>

          <div className="note__actions-wrapper">
            <div className="note__actions">
              <button
                title={note?.archived ? "unarchive" : "archive"}
                className="note__action"
                onClick={hasFetched ? handleArchive : undefined}
              >
                <span>{note?.archived ? "📂" : "📁"}</span>
              </button>
              <button
                title="delete"
                className="note__action"
                onClick={hasFetched ? handleDelete : undefined}
              >
                <span>⛔</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
