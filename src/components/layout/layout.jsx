import "./layout.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useTheme } from "../../hooks";
import { LoginPage, RegisterPage } from "../../pages/auth-page";
import { NewNotePage } from "../../pages/new-note-page";
import { NotFoundPage } from "../../pages/not-found-page";
import { NotePage } from "../../pages/note-page";
import { NotesListPage } from "../../pages/notes-list-page";
import { THEME } from "../../utils/theme-data";
import { ProtectedRoute } from "./protected-route";

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
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<NotesListPage type="active" />} />
              <Route
                path="/archive"
                element={<NotesListPage type="archived" />}
              />
              <Route path="/new-note" element={<NewNotePage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
