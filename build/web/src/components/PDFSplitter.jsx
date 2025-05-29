import React, { useState } from 'react';
import styled from 'styled-components';
import { splitPDF } from '../utils/splitPDF';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  border: 2px dashed #aaa;
  border-radius: 8px;
  text-align: center;
`;

const InputRow = styled.div`
  margin: 1rem 0;
`;

const Button = styled.button`
  background: #333;
  color: white;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

export default function PDFSplitter() {
  const [file, setFile] = useState(null);
  const [range, setRange] = useState('');
  const [splitting, setSplitting] = useState(false);

  const handleFileChange = (e) => {
    const picked = e.target.files[0];
    if (picked?.type === 'application/pdf') setFile(picked);
  };

  const handleSplit = async () => {
    if (!file || !range) return;
    setSplitting(true);

    const buffer = new Uint8Array(await file.arrayBuffer());
    const pages = range
      .split(',')
      .map(r => r.trim())
      .flatMap(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
        }
        return [parseInt(part) - 1];
      });

    const result = await splitPDF(buffer, pages);
    const blob = new Blob([result], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split.pdf';
    a.click();

    setSplitting(false);
  };

  return (
    <Wrapper>
      <h2>Split PDF by Pages</h2>
      <InputRow>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </InputRow>
      <InputRow>
        <input
          type="text"
          placeholder="Enter pages (e.g. 1-3,5,7)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
      </InputRow>
      <Button onClick={handleSplit} disabled={splitting}>
        {splitting ? 'Splitting...' : 'Split PDF'}
      </Button>
    </Wrapper>
  );
}
