import { PDFDocument } from 'pdf-lib';

/**
 * Delete a page from the given PDF.
 * @param {Uint8Array} pdfBytes
 * @param {number} pageIndex - zero-based index
 * @returns {Promise<Uint8Array>}
 */
export async function deletePage(pdfBytes, pageIndex) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();

  if (pageIndex < 0 || pageIndex >= pageCount) {
    throw new Error('Invalid page index');
  }

  pdfDoc.removePage(pageIndex);
  return await pdfDoc.save();
}

/**
 * Insert a blank page at a specific index
 * @param {Uint8Array} pdfBytes
 * @param {number} atIndex
 * @returns {Promise<Uint8Array>}
 */
export async function insertBlankPage(pdfBytes, atIndex) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const { width, height } = pdfDoc.getPage(0).getSize();

  const newPage = pdfDoc.insertPage(atIndex, [width, height]);
  return await pdfDoc.save();
}

/**
 * Reorder pages
 * @param {Uint8Array} pdfBytes
 * @param {number[]} newOrder - array of page indexes in new order
 * @returns {Promise<Uint8Array>}
 */
export async function reorderPages(pdfBytes, newOrder) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const copied = await PDFDocument.create();

  for (let i of newOrder) {
    const [page] = await copied.copyPages(pdfDoc, [i]);
    copied.addPage(page);
  }

  return await copied.save();
}
