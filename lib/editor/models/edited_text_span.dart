import 'package:flutter/material.dart';

class EditedTextSpan {
  final String text;
  final Rect boundingBox;
  final EditedTextStyle style;

  EditedTextSpan({
    required this.text,
    required this.boundingBox,
    required this.style,
  });
}

class EditedTextStyle {
  final String fontFamily;
  final double fontSize;
  final FontWeight fontWeight;
  final FontStyle fontStyle;
  final Color color;

  EditedTextStyle({
    required this.fontFamily,
    required this.fontSize,
    required this.fontWeight,
    required this.fontStyle,
    required this.color,
  });
}
