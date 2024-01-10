import "./notes-list-page.css";

import React from "react";

import { NotesList } from "../../components/notes-list";
import { Navbar } from "../../components/ui/navbar";
import { getActiveNotes, getArchivedNotes } from "../../utils/network-data";
import { notesListType } from "../../utils/validator";

export function NotesListPage({ type = "active" }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchNotes = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const notesData =
        type === "active" ? await getActiveNotes() : await getArchivedNotes();

      if (notesData.error) {
        setError("Fail to fetch notes!");
        return;
      }

      setNotes(notesData.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Fail to fetch notes!");
    }
  }, [type]);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes, type]);

  return (
    <>
      <Navbar />
      {error ? (
        <section className="notes-list-page__error-message">
          <span>⚠️</span>
          <p>oops, we failed to fetch the notes!</p>
        </section>
      ) : isLoading ? (
        <section className="notes-list-page__loading-wrapper"></section>
      ) : (
        <NotesList type={type} notes={notes ?? []} />
      )}
    </>
  );
}

NotesListPage.propTypes = {
  type: notesListType.isRequired,
};
