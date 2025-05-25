import 'package:flutter/material.dart';
import 'package:pdf4ever/editor/models/edited_text_span.dart';

class TextEditController extends ChangeNotifier {
  final List<EditedTextSpan> _editedSpans = [];

  List<EditedTextSpan> get editedSpans => List.unmodifiable(_editedSpans);

  void updateSpan(EditedTextSpan updated) {
    final index = _editedSpans.indexWhere((e) =>
        e.boundingBox.left == updated.boundingBox.left &&
        e.boundingBox.top == updated.boundingBox.top &&
        e.boundingBox.width == updated.boundingBox.width &&
        e.boundingBox.height == updated.boundingBox.height);

    if (index != -1) {
      _editedSpans[index] = updated;
    } else {
      _editedSpans.add(updated);
    }

    notifyListeners();
  }

  void clear() {
    _editedSpans.clear();
    notifyListeners();
  }
}
