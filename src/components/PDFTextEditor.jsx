import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?worker';
import styled from 'styled-components';

import FontToolbar from './FontToolbar';
import SavePDFButton from 'SavePDFButton';
import AnnotationCanvas from './AnnotationCanvas';
import AnnotationToolbar from './AnnotationToolbar';
import StickyNoteTool from './StickyNoteTool';
import PageActions from 'PageActions';

GlobalWorkerOptions.workerSrc = pdfWorker;

const ViewerContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
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

export default function PDFTextEditor({ pdfBytes, premium }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentBytes, setCurrentBytes] = useState(pdfBytes);
  const [textBlocks, setTextBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [currentFont, setCurrentFont] = useState('Helvetica');
  const [activeTool, setActiveTool] = useState('select');
  const [notes, setNotes] = useState([]);

  const availableFonts = [
    'Helvetica', 'Arial', 'Times New Roman', 'Courier New',
    'Georgia', 'Verdana', 'Tahoma', 'Trebuchet MS'
  ];

  useEffect(() => {
    if (!currentBytes) return;
    (async () => {
      const loadingTask = getDocument({ data: currentBytes });
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      await renderPage(doc, 1);
    })();
  }, [currentBytes]);

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
        {premium && (
          <FontToolbar
            currentFont={currentFont}
            availableFonts={availableFonts}
            onFontChange={setCurrentFont}
          />
        )}

        <PageActions
          pdfBytes={currentBytes}
          currentPage={currentPage}
          setPdfBytes={setCurrentBytes}
        />

        <canvas ref={canvasRef} />

        <AnnotationCanvas
          width={canvasRef.current?.width}
          height={canvasRef.current?.height}
          tool={activeTool}
        />

        <StickyNoteTool notes={notes} setNotes={setNotes} />

        {textBlocks.map((tb, i) => {
          const [a, b, c, d, x, y] = tb.transform;
          const isEditable = premium || i < 3;

          return (
            <ContentEditable
              key={i}
              html={tb.str}
              disabled={!isEditable}
              onChange={(e) => {
                const newBlocks = [...textBlocks];
                newBlocks[i].str = e.target.value;
                setTextBlocks(newBlocks);
              }}
              style={{
                position: 'absolute',
                transform: `matrix(${a},${b},${c},${d},${x},${canvasRef.current?.height - y})`,
                fontFamily: premium ? currentFont : tb.fontName || 'Helvetica',
                background: premium ? 'rgba(255,255,255,0.3)' : 'transparent',
                outline: premium ? '1px dashed rgba(0,0,0,0.2)' : 'none',
                whiteSpace: 'nowrap',
                padding: '1px',
                color: premium ? '#111' : 'inherit'
              }}
            />
          );
        })}

        <SavePDFButton
          pdfBytes={currentBytes}
          textBlocks={textBlocks}
          pageHeight={canvasRef.current?.height || 800}
        />
      </CanvasWrapper>

      <AnnotationToolbar activeTool={activeTool} onChangeTool={setActiveTool} />
    </ViewerContainer>
  );
}
