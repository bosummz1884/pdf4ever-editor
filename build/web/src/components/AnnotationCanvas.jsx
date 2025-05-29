import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import styled from 'styled-components';

const Overlay = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
`;

export default function AnnotationCanvas({ width, height, tool }) {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !width || !height) return;

    const fabricCanvas = new fabric.Canvas(canvasEl, {
      isDrawingMode: tool === 'draw',
      selection: false,
    });

    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);

    if (tool === 'highlight') {
      fabricCanvas.on('mouse:down', (e) => {
        if (e.pointer) {
          const rect = new fabric.Rect({
            left: e.pointer.x,
            top: e.pointer.y,
            width: 100,
            height: 20,
            fill: 'rgba(255,255,0,0.3)',
            selectable: false,
          });
          fabricCanvas.add(rect);
        }
      });
    }

    if (tool === 'draw') {
      fabricCanvas.freeDrawingBrush.color = '#000';
      fabricCanvas.freeDrawingBrush.width = 2;
    }

    fabricRef.current = fabricCanvas;

    return () => {
      fabricCanvas.dispose();
    };
  }, [tool, width, height]);

  return <Overlay ref={canvasRef} width={width} height={height} />;
}
