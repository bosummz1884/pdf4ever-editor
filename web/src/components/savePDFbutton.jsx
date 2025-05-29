import React from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SavePDFButton({ pdfBytes, textBlocks, pageHeight }) {
  const handleSave = async () => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPage(0);

    for (let i = 0; i < textBlocks.length; i++) {
      const tb = textBlocks[i];
      const [a, , , , x, y] = tb.transform;

      page.drawText(tb.str, {
        x,
        y: pageHeight - y,
        size: a,
        font: await pdfDoc.embedFont('Helvetica'), // Default to Helvetica
        color: undefined // use default color
      });
    }

    const updatedPdf = await pdfDoc.save();
    const blob = new Blob([updatedPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited.pdf';
    link.click();
  };

  return (
    <button
      onClick={handleSave}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: '#222',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '0.75rem 1.25rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 1000
      }}
    >
      Save PDF
    </button>
  );
}
