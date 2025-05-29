import { PDFDocument } from 'pdf-lib';

/**
 * Split a PDF into separate chunks or extract selected pages
 * @param {Uint8Array} pdfBytes - original PDF bytes
 * @param {number[]} pageIndexes - array of zero-based page indexes to keep
 * @returns {Promise<Uint8Array>} - new PDF bytes with selected pages
 */
export async function splitPDF(pdfBytes, pageIndexes) {
  const originalPdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(originalPdf, pageIndexes);
  pages.forEach((page) => newPdf.addPage(page));
  return await newPdf.save();
}
