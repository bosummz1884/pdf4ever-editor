// src/App.jsx

import React, { useState } from 'react';
import PDFTextEditor from './components/PDFTextEditor';
import TextToolbar from './components/TextToolbar';
import OfferWall from './components/OfferWall';
import OceanGradient from './components/OceanGradient';

export default function App() {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [fontSize, setFontSize] = useState(12);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [color, setColor] = useState('#000000');
  const [credits, setCredits] = useState(() => {
    const stored = localStorage.getItem('credits');
    return stored ? parseInt(stored) : 1;
  });

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (credits <= 0) {
      alert('No free credits left. Use offer wall to earn more!');
      return;
    }
    const buffer = await file.arrayBuffer();
    setPdfBytes(new Uint8Array(buffer));
    setCredits((prev) => {
      const updated = prev - 1;
      localStorage.setItem('credits', updated);
      return updated;
    });
  };

  const handleReward = (amount) => {
    setCredits((prev) => {
      const updated = prev + amount;
      localStorage.setItem('credits', updated);
      return updated;
    });
  };

  return (
    <>
      <OceanGradient />
      <div style={{ padding: '1rem' }}>
        <input type="file" accept=".pdf" onChange={onFileChange} />
        <OfferWall credits={credits} onComplete={handleReward} />
        {pdfBytes && <PDFTextEditor pdfBytes={pdfBytes} />}
        <TextToolbar
          fontSize={fontSize}
          setFontSize={setFontSize}
          bold={bold}
          setBold={setBold}
          italic={italic}
          setItalic={setItalic}
          color={color}
          setColor={setColor}
        />
      </div>
    </>
  );
}
