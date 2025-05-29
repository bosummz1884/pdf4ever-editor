window.onload = () => {
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
 const { PDFDocument, StandardFonts } = window['pdf-lib'];
 const fileInput = document.getElementById('pdf-upload');
 const pdfContainer = document.getElementById('pdf-container');
 const downloadBtn = document.getElementById('download-pdf');


  let currentPdf = null;
  let editedTextItems = [];

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    currentPdf = arrayBuffer;
    renderPDF(arrayBuffer);
  });

  async function renderPDF(buffer) {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    pdfContainer.innerHTML = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      pdfContainer.appendChild(canvas);

      const textLayerDiv = document.createElement('div');
      textLayerDiv.className = 'textLayer';
      textLayerDiv.style.width = `${viewport.width}px`;
      textLayerDiv.style.height = `${viewport.height}px`;
      textLayerDiv.style.position = 'absolute';
      textLayerDiv.style.top = `${canvas.offsetTop}px`;
      textLayerDiv.style.left = `${canvas.offsetLeft}px`;
      pdfContainer.appendChild(textLayerDiv);

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      const textContent = await page.getTextContent();
      textContent.items.forEach((item, index) => {
        const span = document.createElement('div');
        span.className = 'text-span';
        span.contentEditable = true;
        span.innerText = item.str;
        const transform = pdfjsLib.Util.transform(viewport.transform, item.transform);
        const x = transform[4];
        const y = transform[5] - item.height;

        span.style.position = 'absolute';
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.fontSize = `${item.height}px`;
        span.style.fontFamily = item.fontName || 'Helvetica';
        span.dataset.page = pageNum;
        span.dataset.index = index;
        textLayerDiv.appendChild(span);
      });
    }
  }

  downloadBtn.addEventListener('click', async () => {
    if (!currentPdf) return;

    const pdfDoc = await PDFDocument.load(currentPdf);
    const pages = pdfContainer.querySelectorAll('.textLayer');

    pages.forEach((layer, pageIndex) => {
      const spans = layer.querySelectorAll('.text-span');
      spans.forEach((span) => {
        const editedText = span.innerText;
        const x = parseFloat(span.style.left);
        const y = parseFloat(span.style.top);
        const size = parseFloat(span.style.fontSize);
        const font = span.style.fontFamily;

        editedTextItems.push({
          pageIndex,
          text: editedText,
          x,
          y,
          size,
          font,
        });
      });
    });

    for (let edit of editedTextItems) {
      const page = pdfDoc.getPage(edit.pageIndex);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.drawText(edit.text, {
        x: edit.x,
        y: page.getHeight() - edit.y - edit.size,
        size: edit.size,
        font: font,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    editedTextItems = [];
  });
};
