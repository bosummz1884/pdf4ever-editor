import 'package:flutter/material.dart';
import 'package:pdf4ever/editor/models/edited_text_span.dart';
import 'package:pdf4ever/editor/widgets/text_editor_overlay.dart';

class InteractiveTextOverlay extends StatefulWidget {
  final List<EditedTextSpan> textSpans;
  final Function(EditedTextSpan) onTextChanged;

  const InteractiveTextOverlay({
    super.key,
    required this.textSpans,
    required this.onTextChanged,
  });

  @override
  State<InteractiveTextOverlay> createState() => _InteractiveTextOverlayState();
}

class _InteractiveTextOverlayState extends State<InteractiveTextOverlay> {
  void _openEditor(EditedTextSpan span) async {
    final updated = await showDialog<EditedTextSpan>(
      context: context,
      builder: (_) => TextEditorOverlay(initialSpan: span),
    );

    if (updated != null) {
      widget.onTextChanged(updated);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: widget.textSpans.map((span) {
        return Positioned(
          left: span.boundingBox.left,
          top: span.boundingBox.top,
          width: span.boundingBox.width,
          height: span.boundingBox.height,
          child: GestureDetector(
            onTap: () => _openEditor(span),
            child: Container(
              color: Colors.transparent,
            ),
          ),
        );
      }).toList(),
    );
  }
}
