import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const getKeep = async () => {
    try {
      const res = await fetch("http://localhost:5000/keeps");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getKeep();
  }, []);

  async function deleteNote(id) {
    try {
      const deleteKeep = await fetch(`http://localhost:5000/keeps/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.keep_id !== id));
      console.log(deleteKeep);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((noteItem) => {
        return (
          <Note
          id={noteItem.keep_id}
            key={noteItem.keep_id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
