import React from 'react';
import styled from 'styled-components';

const ToolbarWrapper = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  padding: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #222;
    border-color: #444;
    color: white;
  }
`;

const ToolButton = styled.button`
  border: none;
  background: ${(props) => (props.active ? '#444' : '#ddd')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  padding: 6px 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? '#333' : '#ccc')};
  }

  @media (prefers-color-scheme: dark) {
    background: ${(props) => (props.active ? '#eee' : '#444')};
    color: ${(props) => (props.active ? '#000' : '#fff')};

    &:hover {
      background: ${(props) => (props.active ? '#fff' : '#555')};
    }
  }
`;

export default function AnnotationToolbar({ activeTool, onChangeTool }) {
  const tools = ['select', 'highlight', 'draw'];

  return (
    <ToolbarWrapper>
      {tools.map((tool) => (
        <ToolButton
          key={tool}
          active={tool === activeTool}
          onClick={() => onChangeTool(tool)}
        >
          {tool.charAt(0).toUpperCase() + tool.slice(1)}
        </ToolButton>
      ))}
    </ToolbarWrapper>
  );
}
