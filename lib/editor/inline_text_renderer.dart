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

  static const supportedFonts = [
    'Arial', 'ArialBlack', 'Verdana', 'Tahoma', 'TrebuchetMS',
    'TimesNewRoman', 'Georgia', 'PalatinoLinotype', 'Garamond', 'CourierNew',
    'LucidaConsole', 'LucidaSansUnicode', 'Impact', 'ComicSansMS', 'Calibri',
    'Cambria', 'Candara', 'Constantia', 'Corbel', 'SegoeUI', 'Helvetica',
    'HelveticaNeue', 'GillSans', 'Futura', 'FranklinGothicMedium',
    'CenturyGothic', 'BookAntiqua', 'Baskerville', 'Rockwell', 'BodoniMT',
    'Avenir', 'Optima', 'Didot', 'Univers', 'MyriadPro', 'MinionPro',
    'NeueHaasGrotesk', 'ProximaNova', 'Lato', 'Montserrat', 'Roboto',
    'OpenSans', 'NotoSans', 'Raleway', 'SourceSansPro', 'PTSans',
    'Poppins', 'Inter', 'Ubuntu', 'Merriweather',
  ];

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Image.memory(pageImage.bytes),
        ...editedTextSpans.map((span) {
          final cleanFont = _matchFont(span.style.fontFamily);
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
                  fontFamily: cleanFont,
                  fontWeight: _parseFontWeight(span.style.fontWeight),
                  fontStyle: _parseFontStyle(span.style.fontStyle),
                  color: span.style.color,
                ),
              ),
            ),
          );
        }).toList(),
      ],
    );
  }

  String _matchFont(String? rawFont) {
    if (rawFont == null) return 'Roboto';
    final cleaned = rawFont.replaceAll(RegExp(r'[^a-zA-Z]'), '').toLowerCase();

    for (final font in supportedFonts) {
      final normalized = font.replaceAll(RegExp(r'[^a-zA-Z]'), '').toLowerCase();
      if (cleaned.contains(normalized)) return font;
    }
    return 'Roboto'; // fallback
  }

  FontStyle _parseFontStyle(String? fontStyle) {
    switch (fontStyle?.toLowerCase()) {
      case 'italic':
        return FontStyle.italic;
      default:
        return FontStyle.normal;
    }
  }

  FontWeight _parseFontWeight(String? fontWeight) {
    switch (fontWeight?.toLowerCase()) {
      case 'w100': return FontWeight.w100;
      case 'w200': return FontWeight.w200;
      case 'w300': return FontWeight.w300;
      case 'w400':
      case 'normal': return FontWeight.w400;
      case 'w500': return FontWeight.w500;
      case 'w600': return FontWeight.w600;
      case 'w700':
      case 'bold': return FontWeight.w700;
      case 'w800': return FontWeight.w800;
      case 'w900': return FontWeight.w900;
      default: return FontWeight.normal;
    }
  }
}
