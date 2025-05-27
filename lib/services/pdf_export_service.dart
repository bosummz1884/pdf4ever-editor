import 'dart:typed_data';
import 'package:flutter/services.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:pdf4ever/editor/models/edited_text_span.dart';
import 'package:pdf4ever/services/font_loader.dart';

class PDFExportService {
  Future<Uint8List> generateEditedPDF({
    required List<EditedTextSpan> edits,
    required List<PdfPageFormat> originalPageFormats,
    required int pageIndex,
  }) async {
    final doc = pw.Document();
    final pageFormat = originalPageFormats[pageIndex];

    doc.addPage(
      pw.Page(
        pageFormat: pageFormat,
        build: (pw.Context context) {
          return pw.Stack(
            children: edits.map((e) {
              final pw.Font font = FontLoaderService.getFont(e.style.fontFamily);
              return pw.Positioned(
                left: e.boundingBox.left,
                top: e.boundingBox.top,
                child: pw.Text(
                  e.text,
                  style: pw.TextStyle(
                    font: font,
                    fontSize: e.style.fontSize,
                    color: PdfColor.fromInt(e.style.color.value),
                  ),
                ),
              );
            }).toList(),
          );
        },
      ),
    );

    return await doc.save();
  }
}
