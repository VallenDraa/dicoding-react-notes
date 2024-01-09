import "./layout.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useTheme } from "../../hooks";
import { LoginPage } from "../../pages/login-page";
import { NewNotePage } from "../../pages/new-note-page";
import { NotFoundPage } from "../../pages/not-found-page";
import { NotePage } from "../../pages/note-page";
import { NotesListPage } from "../../pages/notes-list-page";
import { THEME } from "../../utils/theme-data";

export function Layout() {
  const { theme } = useTheme();

  return (
    <div
      className={`note-app ${
        theme === THEME.dark ? "note-app--dark" : "note-app--light"
      }`}
    >
      <main className="note-app__body">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
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
