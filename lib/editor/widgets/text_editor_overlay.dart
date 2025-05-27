import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:pdf4ever/editor/models/edited_text_span.dart';

class TextEditorOverlay extends StatefulWidget {
  final EditedTextSpan initialSpan;

  const TextEditorOverlay({super.key, required this.initialSpan});

  @override
  State<TextEditorOverlay> createState() => _TextEditorOverlayState();
}

class _TextEditorOverlayState extends State<TextEditorOverlay> {
  late TextEditingController _controller;
  late EditedTextStyle _style;
  Color currentColor = Colors.black;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialSpan.text);
    _style = widget.initialSpan.style;
    currentColor = _style.color;
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Edit Text'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _controller,
              style: TextStyle(
                fontFamily: _style.fontFamily,
                fontSize: _style.fontSize,
                fontWeight: _style.fontWeight == 'bold' ? FontWeight.bold : FontWeight.normal,
                fontStyle: _style.fontStyle == 'italic' ? FontStyle.italic : FontStyle.normal,
                color: currentColor,
              ),
              maxLines: null,
            ),
            const SizedBox(height: 20),
            BlockPicker(
              pickerColor: currentColor,
              onColorChanged: (color) {
                setState(() {
                  currentColor = color;
                  _style = EditedTextStyle(
                    fontFamily: _style.fontFamily,
                    fontSize: _style.fontSize,
                    fontWeight: _style.fontWeight,
                    fontStyle: _style.fontStyle,
                    color: color,
                  );
                });
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            final updated = EditedTextSpan(
              text: _controller.text,
              boundingBox: widget.initialSpan.boundingBox,
              style: _style,
            );
            Navigator.of(context).pop(updated);
          },
          child: const Text('Save'),
        ),
      ],
    );
  }
}
