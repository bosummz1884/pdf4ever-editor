import React, { useState, useEffect } from 'react';
import PdfEditor from './components/PdfEditor';
import Offerwall from './components/Offerwall';

export default function App() {
  const [tokens, setTokens] = useState(0);
  useEffect(() => {
    const t = Number(localStorage.getItem('tokens') || 0);
    setTokens(t);
  }, []);
  const handleEarn = (n) => {
    const newTokens = tokens + n;
    localStorage.setItem('tokens', newTokens);
    setTokens(newTokens);
  };
  return (
    <div className="app">
      <h1>PDF4EVER Editor</h1>
      <div>Free Edit Tokens: {tokens}</div>
      <Offerwall onEarn={handleEarn} />
      <PdfEditor tokens={tokens} />
    </div>
  );
}
