import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../pages/home-page";
import { NotFoundPage } from "../../pages/not-found-page";
import { ArchivePage } from "../../pages/archive-page";
import { NotePage } from "../../pages/note-page";
import { NewNotePage } from "../../pages/new-note-page";
import React from "react";
import { getInitialData, saveNotes } from "../../utils";
import "./layout.css";

export class Layout extends React.Component {
  constructor() {
    super();

    this.state = { notes: getInitialData() };
  }

  onAddNote = (title, body) => {
    const newNotes = [
      ...this.state.notes,
      {
        id: crypto.randomUUID(),
        title: title || "untitled note.",
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      },
    ];

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  };

  onArchive = id => {
    const newNotes = [...this.state.notes];

    newNotes.forEach((note, i) => {
      if (note.id === id) {
        newNotes[i].archived = !newNotes[i].archived;
      }
    });

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  };

  onDelete = id => {
    const newNotes = [...this.state.notes].filter(note => note.id !== id);

    this.setState({ notes: newNotes });
    saveNotes(newNotes);
  };

  render() {
    return (
      <div className="note-app">
        <main className="note-app__body">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage notes={this.state.notes} />} />
              <Route
                path="/archive"
                element={<ArchivePage notes={this.state.notes} />}
              />
              <Route
                path="/new-note"
                element={<NewNotePage onAddNote={this.onAddNote} />}
              />
              <Route
                path="/note/:id"
                element={
                  <NotePage
                    notes={this.state.notes}
                    onArchive={this.onArchive}
                    onDelete={this.onDelete}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}
