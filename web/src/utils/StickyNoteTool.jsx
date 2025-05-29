import React, { useState } from 'react';
import styled from 'styled-components';

const Note = styled.div`
  position: absolute;
  min-width: 150px;
  min-height: 100px;
  background: #fffcab;
  border: 1px solid #d2cb00;
  padding: 0.5rem;
  font-size: 0.85rem;
  resize: both;
  overflow: auto;
  z-index: 1001;
`;

export default function StickyNoteTool({ notes, setNotes }) {
  const [draggingNote, setDraggingNote] = useState(null);

  const handleDoubleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const newNote = {
      id: Date.now(),
      x,
      y,
      text: 'New note...',
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const updateNote = (id, text) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const dragStart = (id) => setDraggingNote(id);

  const dragEnd = () => setDraggingNote(null);

  const drag = (e) => {
    if (!draggingNote) return;
    const newX = e.clientX;
    const newY = e.clientY;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === draggingNote ? { ...note, x: newX, y: newY } : note
      )
    );
  };

  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      onDoubleClick={handleDoubleClick}
      onMouseMove={drag}
      onMouseUp={dragEnd}
    >
      {notes.map((note) => (
        <Note
          key={note.id}
          style={{ left: note.x, top: note.y }}
          onMouseDown={() => dragStart(note.id)}
        >
          <textarea
            value={note.text}
            onChange={(e) => updateNote(note.id, e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
            }}
          />
        </Note>
      ))}
    </div>
  );
}
