import React from 'react';
import styled from 'styled-components';
import { deletePage, insertBlankPage } from '../utils/pageTools';

const Panel = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: #f5f5f5;
  padding: 0.75rem;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  z-index: 500;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (prefers-color-scheme: dark) {
    background: #222;
    color: white;
  }
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: none;
  background: #444;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #111;
  }
`;

export default function PageActions({ pdfBytes, currentPage, setPdfBytes }) {
  const handleDelete = async () => {
    const updated = await deletePage(pdfBytes, currentPage - 1);
    setPdfBytes(updated);
  };

  const handleInsert = async () => {
    const updated = await insertBlankPage(pdfBytes, currentPage);
    setPdfBytes(updated);
  };

  return (
    <Panel>
      <Button onClick={handleDelete}>🗑 Delete Page {currentPage}</Button>
      <Button onClick={handleInsert}>➕ Insert Blank After</Button>
    </Panel>
  );
}
