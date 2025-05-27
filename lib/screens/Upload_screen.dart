import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:pdf4ever/screens/document_editor_screen.dart';

class UploadScreen extends StatelessWidget {
  const UploadScreen({super.key});


  Future<void> _pickAndOpenPDF(BuildContext context) async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf'],
    );

    if (result != null && result.files.single.bytes != null) {
      final Uint8List pdfData = result.files.single.bytes!;
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => DocumentEditorScreen(pdfBytes: pdfData),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No file selected.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Upload a PDF')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => _pickAndOpenPDF(context),
          child: const Text('Choose PDF to Edit'),
        ),
      ),
    );
  }
}
