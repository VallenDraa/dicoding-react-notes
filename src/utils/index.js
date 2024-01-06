export const getInitialData = () => {
  const notes = localStorage.getItem("notes");

  if (notes === null) {
    const newNotes = [
      {
        id: crypto.randomUUID(),
        title: "Babel",
        body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Functional Component",
        body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Modularization",
        body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Lifecycle",
        body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
      {
        id: crypto.randomUUID(),
        title: "ESM",
        body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Module Bundler",
        body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
    ];

    saveNotes(newNotes);

    return newNotes;
  }

  return JSON.parse(notes);
};

export const showFormattedDate = date => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};

export const createNewNote = (title, body) => {
  return {
    id: crypto.randomUUID(),
    title,
    body,
    archived: false,
    createdAt: new Date().toISOString(),
  };
};

export const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const getFilteredNotes = (
  notes,
  activeType = "active",
  keyword = "",
) => {
  let filteredNotes = [];

  if (activeType === "active") {
    filteredNotes = notes.filter(note => !note.archived);
  }

  if (activeType === "archived") {
    filteredNotes = notes.filter(note => note.archived);
  }

  const lowercasedKeyword = keyword.toLowerCase();

  return keyword === ""
    ? filteredNotes
    : filteredNotes.filter(
        note =>
          note.title.toLowerCase().includes(lowercasedKeyword) ||
          note.body.toLowerCase().includes(lowercasedKeyword) ||
          note.createdAt.toLowerCase().includes(lowercasedKeyword),
      );
};
