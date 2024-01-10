import "./notes-list-page.css";

import React from "react";

import { NotesList } from "../../components/notes-list";
import { Navbar } from "../../components/ui/navbar";
import { useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";
import { getActiveNotes, getArchivedNotes } from "../../utils/network-data";
import { notesListType } from "../../utils/validator";

export function NotesListPage({ type = "active" }) {
  const { locale } = useLocale();

  const [isLoading, setIsLoading] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [error, setError] = React.useState(false);

  const fetchNotes = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const notesData =
        type === "active" ? await getActiveNotes() : await getArchivedNotes();

      if (notesData.error) {
        setError(true);
        return;
      }

      setNotes(notesData.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
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
          <p>{LOCALE_DATA[locale].notesListPage.errorAlert}</p>
        </section>
      ) : (
        <NotesList type={type} notes={notes ?? []} isLoading={isLoading} />
      )}
    </>
  );
}

NotesListPage.propTypes = {
  type: notesListType.isRequired,
};
