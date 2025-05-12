import React, { useRef, useState, useEffect } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocument } from 'pdf-lib';

GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${GlobalWorkerOptions.version}/pdf.worker.js`;

export default function PdfEditor({ tokens }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  const onFileChange = async (e) => {
    const firstFree = localStorage.getItem('firstFreeUsed');
    let t = Number(localStorage.getItem('tokens') || 0);
    if (!firstFree) {
      localStorage.setItem('firstFreeUsed', 'true');
    } else if (t > 0) {
      localStorage.setItem('tokens', t - 1);
    } else {
      alert('No free edits left. Subscribe for unlimited edits or earn more tokens!');
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
    }
  };

  useEffect(() => {
    const renderPage = async () => {
      if (pdfDoc) {
        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 });
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.height = viewport.height;
        canvasRef.current.width = viewport.width;
        await page.render({ canvasContext: ctx, viewport }).promise;
      }
    };
    renderPage();
  }, [pdfDoc]);

  return (
    <div className="pdf-editor">
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <canvas ref={canvasRef} />
    </div>
  );
}
