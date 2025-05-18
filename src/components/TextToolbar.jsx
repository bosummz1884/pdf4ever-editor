// src/components/TextToolbar.jsx

import React from 'react';
import styled from 'styled-components';
import { HexColorPicker } from 'react-colorful';

const ToolbarContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export default function TextToolbar({
  fontSize,
  setFontSize,
  bold,
  setBold,
  italic,
  setItalic,
  color,
  setColor
}) {
  return (
    <ToolbarContainer>
      <label>
        Font Size:
        <input
          type="number"
          min="8"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          style={{ width: '50px', marginLeft: '0.5rem' }}
        />
      </label>

      <button onClick={() => setBold(!bold)} style={{ fontWeight: bold ? 'bold' : 'normal' }}>
        B
      </button>
      <button onClick={() => setItalic(!italic)} style={{ fontStyle: italic ? 'italic' : 'normal' }}>
        I
      </button>

      <div>
        <span style={{ fontSize: '0.85rem' }}>Text Color:</span>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </ToolbarContainer> // Rebuild Trigger
  );
}
