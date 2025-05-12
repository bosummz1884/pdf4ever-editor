// src/components/PDFTextEditor.tsx (UPDATED with Sidebar & Reflow)

import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { PDFDocument } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import styled from 'styled-components';

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const EditorContainer = styled.div`
  position: relative;
  width: 100%; height: 100%;
`; 

export interface TextBlock {
  str: string;
  transform: number[];
  fontName: string;
  width: number;
  height: number;
}

function measureText(font: string, size: number, text: string): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${size}px ${font}`;
  return ctx.measureText(text).width;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  return lines;
}

const ThumbnailSidebar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 100%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  z-index: 2;
  border-right: 1px solid #ccc;
`;

const PageButton = styled.div`
  cursor: pointer;
  padding: 4px;
  margin: 4px;
  background: #eee;
  border-radius: 4px;
  text-align: center;
  &:hover {
    background: #ddd;
  }
`;

export default function PDFTextEditor({ pdfBytes }: { pdfBytes: Uint8Array }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
  const [doc, setDoc] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    (async () => {
      const loading = getDocument({ data: pdfBytes });
      const pdf = await loading.promise;
      setDoc(pdf);
      setNumPages(pdf.numPages);
      renderPage(pdf, currentPage);
    })();
  }, [pdfBytes]);

  const renderPage = async (pdf: any, pageNum: number) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = canvasRef.current!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;

    const content = await page.getTextContent();
    const blocks = content.items.map((item: any) => ({
      str: item.str,
      transform: item.transform,
      fontName: item.fontName,
      width: item.width,
      height: item.height
    }));
    setTextBlocks(blocks);
  };

  const onSave = async () => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPage(currentPage - 1);
    textBlocks.forEach(tb => {
      page.drawText(tb.str, {
        x: tb.transform[4],
        y: canvasRef.current!.height - tb.transform[5],
        size: tb.transform[0],
        font: pdfDoc.embedFont(tb.fontName).catch(_ => pdfDoc.embedStandardFont('Helvetica'))
      });
    });
    const newBytes = await pdfDoc.save();
    const blob = new Blob([newBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'edited.pdf'; a.click();
  };

  return (
    <EditorContainer>
      <ThumbnailSidebar>
        {[...Array(numPages)].map((_, i) => (
          <PageButton key={i} onClick={() => {
            setCurrentPage(i + 1);
            renderPage(doc, i + 1);
          }}>
            Page {i + 1}
          </PageButton>
        ))}
      </ThumbnailSidebar>

      <canvas ref={canvasRef} style={{ marginLeft: '120px' }} />

      {textBlocks.map((tb, i) => {
        const [a, b, c, d, x, y] = tb.transform;
        return (
          <ContentEditable
            key={i}
            html={tb.str}
            onChange={e => {
              const newText = e.target.value;
              const newBlocks = [...textBlocks];
              const width = measureText(tb.fontName || 'Helvetica', tb.transform[0], newText);
              newBlocks[i] = { ...tb, str: newText, width };
              setTextBlocks(newBlocks);
            }}
            style={{
              position: 'absolute',
              transform: `matrix(${a},${b},${c},${d},${x},${canvasRef.current!.height - y})`,
              width: tb.width,
              height: tb.height,
              fontFamily: tb.fontName,
              outline: '1px dashed rgba(255,255,255,0.5)'
            }}
          />
        );
      })}
      <button onClick={onSave} style={{ position: 'absolute', top: 10, right: 10 }}>Save PDF</button>
    </EditorContainer>
  );
}
