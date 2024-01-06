import React from "react";
import { Navbar } from "../components/ui/navbar";
import { NotesList } from "../components/notes-list";
import PropTypes from "prop-types";
import { noteValidator } from "../utils/validator";
import { useSearchParams } from "react-router-dom";

export function ArchivePage({ notes = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Navbar />
      <NotesList
        notes={notes}
        noteState="archived"
        keyword={searchParams.get("keyword") || ""}
        onSearch={keyword => setSearchParams({ keyword })}
      />
    </>
  );
}

ArchivePage.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
};
