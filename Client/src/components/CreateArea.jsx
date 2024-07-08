import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { Tune } from "@mui/icons-material";

function CreateArea(props) {
  const [isExpended, setExpended] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/keeps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      window.location = "/";
    } catch (err) {
      console.error(err);
    }

    setNote({
      title: "",
      content: "",
    });
  }

  function Expend() {
    setExpended(Tune);
  }

  return (
    <div>
      <form className="create-note">
        {isExpended ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          onClick={Expend}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpended ? 3 : 1}
        />
        <Zoom in={isExpended ? true : false}>
          <button onClick={submitNote}>
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
