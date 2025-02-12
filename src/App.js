import React, { useState, useEffect } from 'react';
import Note from './component/Note';
import NoteForm from './component/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [theme, setTheme] = useState('light'); // State for managing theme

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme in localStorage
  };

  // UseEffect to load the saved theme from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setNotes(notes.map((n) => (n.id === note.id ? note : n)));
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
  };

  const handleSave = () => {
    setCurrentNote(null);
  };

  return (
    <div className={`app ${theme}`}>
      <h1 className='head'>My Notes</h1>
      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      {currentNote ? (
        <NoteForm note={currentNote} onEdit={editNote} onAdd={handleSave} />
      ) : (
        <NoteForm onAdd={addNote} />
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Note note={note} onDelete={deleteNote} onEdit={handleEdit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
