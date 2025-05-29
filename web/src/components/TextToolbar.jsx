// src/components/TextToolbar.jsx

import React from 'react';
import styled from 'styled-components';
import { HexColorPicker } from 'react-colorful';

const ToolbarWrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function TextToolbar({
  visible,
  fontSize,
  setFontSize,
  bold,
  setBold,
  italic,
  setItalic,
  color,
  setColor
}) {
  if (!visible) return null;

  return (
    <ToolbarWrapper>
      <label>
        Font Size:
        <input
          type="number"
          min="8"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
      </label>

      <button onClick={() => setBold(!bold)} style={{ fontWeight: bold ? 'bold' : 'normal' }}>
        Bold
      </button>
      <button onClick={() => setItalic(!italic)} style={{ fontStyle: italic ? 'italic' : 'normal' }}>
        Italic
      </button>

      <div>
        <span style={{ fontSize: '0.9rem' }}>Text Color:</span>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </ToolbarWrapper>
  );
}

