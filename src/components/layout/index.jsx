import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { ArchivePage } from "../../pages/archive-page";
import { NewNotePage } from "../../pages/new-note-page";
import { NotePage } from "../../pages/note-page";
import { NotFoundPage } from "../../pages/not-found-page";
import "./layout.css";
import { THEME, useThemeContext } from "../../context/theme-context";

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
            <Route path="/" element={<HomePage notes={[]} />} />
            <Route path="/archive" element={<ArchivePage notes={[]} />} />
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
