import React from "react";
import { NotesList } from "../components/notes-list";
import { Navbar } from "../components/ui/navbar";
import PropTypes from "prop-types";
import { noteValidator } from "../utils/validator";
import { useSearchParams } from "react-router-dom";

export function HomePage({ notes = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Navbar />
      <NotesList
        notes={notes}
        noteState="active"
        keyword={searchParams.get("keyword") || ""}
        onSearch={keyword => setSearchParams({ keyword })}
      />
    </>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(noteValidator).isRequired,
};
