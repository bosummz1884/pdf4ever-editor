import React from 'react';
import styled from 'styled-components';

const Toolbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  z-index: 10;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background: rgba(18, 18, 18, 0.95);
    color: white;
    border-color: #333;
  }
`;

export default function FontToolbar({ currentFont, availableFonts, onFontChange }) {
  return (
    <Toolbar>
      <label htmlFor="font-picker">Font:</label>
      <select id="font-picker" value={currentFont} onChange={(e) => onFontChange(e.target.value)}>
        {availableFonts.map((font, i) => (
          <option key={i} value={font}>{font}</option>
        ))}
      </select>
    </Toolbar>
  );
}
