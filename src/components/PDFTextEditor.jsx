// src/components/PDFTextEditor.jsx

import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { PDFDocument } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import styled from 'styled-components';

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const ViewerContainer = styled.div`
  display: flex;
  position: relative;
`;

const CanvasWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
`;

const Sidebar = styled.div`
  width: 100px;
  background: #f2f2f2;
  border-right: 1px solid #ccc;
  overflow-y: auto;
`;

const PageButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  background: #fff;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export default function PDFTextEditor({ pdfBytes }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [textBlocks, setTextBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    if (!pdfBytes) return;
    (async () => {
      const loadingTask = getDocument({ data: pdfBytes });
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      await renderPage(doc, 1);
    })();
  }, [pdfBytes]);

  const renderPage = async (doc, pageNum) => {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const textContent = await page.getTextContent();
    const items = textContent.items.map((item) => ({
      str: item.str,
      transform: item.transform,
      fontName: item.fontName,
      width: item.width,
      height: item.height,
    }));
    setTextBlocks(items);
    setCurrentPage(pageNum);
  };

  return (
    <ViewerContainer>
      <Sidebar>
        {[...Array(numPages)].map((_, i) => (
          <PageButton key={i} onClick={() => renderPage(pdfDoc, i + 1)}>
            Page {i + 1}
          </PageButton>
        ))}
      </Sidebar>

      <CanvasWrapper>
        <canvas ref={canvasRef} />
        {textBlocks.map((tb, i) => {
          const [a, b, c, d, x, y] = tb.transform;
          return (
            <ContentEditable
              key={i}
              html={tb.str}
              onChange={(e) => {
                const newBlocks = [...textBlocks];
                newBlocks[i].str = e.target.value;
                setTextBlocks(newBlocks);
              }}
              style={{
                position: 'absolute',
                transform: `matrix(${a},${b},${c},${d},${x},${canvasRef.current?.height - y})`,
                fontFamily: tb.fontName || 'Helvetica',
                background: 'rgba(255,255,255,0.5)',
                outline: '1px dashed rgba(0,0,0,0.3)',
              }}
            />
          );
        })}
      </CanvasWrapper>
    </ViewerContainer>
  );
}

