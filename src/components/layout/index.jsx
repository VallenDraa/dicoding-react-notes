import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesListPage } from "../../pages/notes-list-page";
import { NewNotePage } from "../../pages/new-note-page";
import { NotePage } from "../../pages/note-page";
import { NotFoundPage } from "../../pages/not-found-page";
import { THEME, useThemeContext } from "../../context/theme-context";
import "./layout.css";

export function Layout() {
  const { theme } = useThemeContext();

  return (
    <div
      className={`note-app ${
        theme === THEME.dark ? "note-app--dark" : "note-app--light"
      }`}
    >
      <main className="note-app__body">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<NotesListPage notes={[]} type="active" />}
            />
            <Route
              path="/archive"
              element={<NotesListPage notes={[]} type="archived" />}
            />
            <Route
              path="/new-note"
              element={<NewNotePage onAddNote={() => {}} />}
            />
            <Route
              path="/note/:id"
              element={
                <NotePage notes={[]} onArchive={() => {}} onDelete={() => {}} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
