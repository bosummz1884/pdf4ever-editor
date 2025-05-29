import { PDFDocument } from 'pdf-lib';

/**
 * Merge multiple PDF files into one
 * @param {Uint8Array[]} fileBuffers - array of Uint8Array PDF buffers
 * @returns {Promise<Uint8Array>} merged PDF as bytes
 */
export async function mergePDFs(fileBuffers) {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of fileBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const finalPdf = await mergedPdf.save();
  return finalPdf;
}
