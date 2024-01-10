import "./note-page.css";

import parse from "html-react-parser";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { CustomSkeleton } from "../../components/custom-skeleton";
import { Navbar } from "../../components/ui/navbar";
import { useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../../utils/network-data";

export function NotePage() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const { id } = useParams();

  const [hasFetched, setHasFetched] = React.useState(false);
  const [note, setNote] = React.useState(null);
  const [error, setError] = React.useState(false);

  const fetchNote = React.useCallback(async () => {
    try {
      const noteData = await getNote(id);

      if (noteData.error) {
        setError(true);
        return;
      }

      setNote(noteData.data);
      setHasFetched(true);
    } catch (error) {
      setHasFetched(true);
      setError(true);
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
    const isConfirmed = confirm(
      LOCALE_DATA[locale].notePage.confirmDeleteAlert,
    );

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
            {LOCALE_DATA[locale].notePage.errorAlert}
          </p>
          <Link to="/" className="note__back-link">
            {`🏠${LOCALE_DATA[locale].notePage.errorBackLink}`}
          </Link>
        </section>
      ) : !note && hasFetched ? (
        <section className="note__alert-wrapper">
          <h2 className="note__alert-title">⚠️</h2>
          <p className="note__alert-message">
            {LOCALE_DATA[locale].notePage.missingAlert}
          </p>
          <Link to="/" className="note__back-link">
            {`🏠${LOCALE_DATA[locale].notePage.errorBackLink}`}
          </Link>
        </section>
      ) : (
        <section className="note__wrapper">
          <div className="note__header">
            <Link to="/" className="note__back-link">
              &larr; {LOCALE_DATA[locale].notePage.back}
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
              <CustomSkeleton height={400} />
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
