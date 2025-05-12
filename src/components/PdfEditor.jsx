import React, { useRef, useState, useEffect } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocument } from 'pdf-lib';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${GlobalWorkerOptions.version}/pdf.worker.js`;

export default function PdfEditor() {
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
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
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
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
