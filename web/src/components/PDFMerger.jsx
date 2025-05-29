import React, { useState } from 'react';
import styled from 'styled-components';
import { mergePDFs } from '../utils/mergePDFs';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 2px dashed #aaa;
  border-radius: 8px;
  text-align: center;
  background: var(--bg-color);
  color: var(--text-color);
`;

const FileList = styled.ul`
  text-align: left;
  padding-left: 1rem;
  font-size: 0.9rem;
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
    background: #111;
  }
`;

export default function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleMerge = async () => {
    setMerging(true);
    const buffers = await Promise.all(files.map(f => f.arrayBuffer().then(buf => new Uint8Array(buf))));
    const merged = await mergePDFs(buffers);
    const blob = new Blob([merged], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.pdf';
    a.click();
    setMerging(false);
  };

  const handleFileSelect = (e) => {
    const picked = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    setFiles((prev) => [...prev, ...picked]);
  };

  return (
    <Wrapper
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>Merge PDF Files</h2>
      <p>Drag and drop PDF files here or select them below:</p>
      <input type="file" accept="application/pdf" multiple onChange={handleFileSelect} />
      {files.length > 0 && (
        <>
          <FileList>
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </FileList>
          <Button onClick={handleMerge} disabled={merging}>
            {merging ? 'Merging...' : 'Merge PDFs'}
          </Button>
        </>
      )}
    </Wrapper>
  );
}
