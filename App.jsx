// src/App.jsx
import React, { useState } from 'react';
import PDFTextEditor from './components/PDFTextEditor';
import OceanGradient from './components/OceanGradient';

export default function App() {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [error, setError] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.includes('pdf')) {
      setError('Only PDF files are supported.');
      return;
    }
    try {
      const buffer = await file.arrayBuffer();
      setPdfBytes(new Uint8Array(buffer));
      setError(null);
    } catch (err) {
      console.error('Error reading file:', err);
      setError('Failed to load PDF. Please try again.');
    }
  };

  return (
    <>
      <OceanGradient />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>PDF4EVER Editor</h1>
        {!pdfBytes && (
          <>
            <p>Select a PDF file to begin editing:</p>
            <input type="file" accept="application/pdf" onChange={onFileChange} />
            {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
          </>
        )}
        {pdfBytes && <PDFTextEditor pdfBytes={pdfBytes} />}
      </div>
    </>
  );
}
