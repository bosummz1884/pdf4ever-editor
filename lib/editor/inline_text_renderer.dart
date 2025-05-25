import 'package:flutter/material.dart';
import 'package:pdfx/pdfx.dart';
import 'package:pdf4ever/editor/models/edited_text_span.dart';

class InlineTextRenderer extends StatelessWidget {
  final PdfPageImage pageImage;
  final List<EditedTextSpan> editedTextSpans;

  const InlineTextRenderer({
    super.key,
    required this.pageImage,
    required this.editedTextSpans,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Image.memory(pageImage.bytes),
        ...editedTextSpans.map((span) {
          return Positioned(
            left: span.boundingBox.left,
            top: span.boundingBox.top,
            width: span.boundingBox.width,
            height: span.boundingBox.height,
            child: IgnorePointer(
              child: Text(
                span.text,
                style: TextStyle(
                  fontSize: span.style.fontSize,
                  fontFamily: span.style.fontFamily,
                  fontWeight: span.style.fontWeight,
                  fontStyle: span.style.fontStyle,
                  color: span.style.color,
                ),
              ),
            ),
          );
        }),
      ],
    );
  }
}
