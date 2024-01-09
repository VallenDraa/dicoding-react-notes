import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import { NotesList } from "../components/notes-list";
import { Navbar } from "../components/ui/navbar";
import { notesListType, noteValidator } from "../utils/validator";

export function NotesListPage({ notes = [], type = "active" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Navbar />
      <NotesList
        notes={notes}
        type={type}
        keyword={searchParams.get("keyword") || ""}
        onSearch={keyword => setSearchParams({ keyword })}
      />
    </>
  );
}

NotesListPage.propTypes = {
  type: notesListType.isRequired,
  notes: PropTypes.arrayOf(noteValidator).isRequired,
};
