import 'dart:html' as html;
import 'package:flutter/material.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf4ever/editor/controllers/text_edit_controller.dart';
import 'package:pdf4ever/services/pdf_export_service.dart';
import 'package:provider/provider.dart';

class DownloadPDFButton extends StatelessWidget {
  const DownloadPDFButton({super.key});

  void _downloadPdf(BuildContext context) async {
    final controller = Provider.of<TextEditController>(context, listen: false);

    if (controller.editedSpans.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Nothing to export')),
      );
      return;
    }

    // Temporary fix: use default page format (Letter size)
    final defaultFormat = PdfPageFormat(612.0, 792.0); // 8.5 x 11 inches in points
    final pageFormats = [defaultFormat];

    final pdfBytes = await PDFExportService().generateEditedPDF(
      edits: controller.editedSpans,
      originalPageFormats: pageFormats,
      pageIndex: 0,
    );

    final blob = html.Blob([pdfBytes]);
    final url = html.Url.createObjectUrlFromBlob(blob);
    html.AnchorElement(href: url)
      ..setAttribute("download", "edited_output.pdf")
      ..click();

    html.Url.revokeObjectUrl(url);
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () => _downloadPdf(context),
      icon: const Icon(Icons.download),
      label: const Text("Download PDF"),
    );
  }
}
