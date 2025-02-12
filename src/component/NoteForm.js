import React, { useState, useEffect } from "react";

const NoteForm = ({ onAdd, note, onEdit, onDelete }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); // Validation error state

  // Sync state with the selected note when editing
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    setError(""); // Clear any existing errors

    if (note) {
      // Editing an existing note
      onEdit({ ...note, title, content });
    } else {
      // Creating a new note with a unique ID
      onAdd({ id: Date.now(), title, content });
    }

    // Reset form only when adding a new note
    if (!note) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="text">
      <input
        className="text1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      /></div><br></br>
      <div className="text">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      /></div>
      <center><button className="btn" type="submit">{note ? "Update" : "Save"}</button></center>

      {/* Show Delete button only when editing an existing note */}
      {note && (
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          style={{ background: "red", color: "white", marginLeft: "10px" }}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default NoteForm;
