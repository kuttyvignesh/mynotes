import React from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
      <button onClick={() => onEdit(note)}>Edit</button>
    </div>
  );
};

export default Note;