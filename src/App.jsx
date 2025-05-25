import React, { useState } from 'react';
import styled from 'styled-components';
import PDFTextEditor from './components/PDFTextEditor';
import PremiumWrapper from './PremiumWrapper';

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg-color);
  min-height: 100vh;
`;

const InputWrapper = styled.div`
  margin-top: 2rem;
`;

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
    <Wrapper>
      <h1>PDF4EVER Editor</h1>

      {!pdfBytes && (
        <InputWrapper>
          <p>Select a PDF file to begin editing:</p>
          <input type="file" accept="application/pdf" onChange={onFileChange} />
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </InputWrapper>
      )}

      {pdfBytes && (
        <PremiumWrapper>
          {({ hasPremium }) => (
            <PDFTextEditor pdfBytes={pdfBytes} premium={hasPremium} />
          )}
        </PremiumWrapper>
      )}
    </Wrapper>
  );
}
