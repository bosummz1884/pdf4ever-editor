import 'package:flutter/material.dart';
import 'package:pdfx/pdfx.dart';
import 'package:provider/provider.dart';
import 'package:pdf4ever/editor/inline_text_renderer.dart';
import 'package:pdf4ever/editor/interactive_text_overlay.dart';
import 'package:pdf4ever/editor/controllers/text_edit_controller.dart';

class DocumentEditorScreen extends StatefulWidget {
  final String pdfAssetPath;

  const DocumentEditorScreen({super.key, required this.pdfAssetPath});

  @override
  State<DocumentEditorScreen> createState() => _DocumentEditorScreenState();
}

class _DocumentEditorScreenState extends State<DocumentEditorScreen> {
  late PdfDocument _document;
  late PdfPageImage _pageImage;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadPdf();
  }

  Future<void> _loadPdf() async {
    _document = await PdfDocument.openAsset(widget.pdfAssetPath);
    final page = await _document.getPage(1);
    _pageImage = (await page.render(
      width: page.width,
      height: page.height,
      format: PdfPageImageFormat.png,
    ))!;
    await page.close();

    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => TextEditController(),
      child: Scaffold(
        appBar: AppBar(title: const Text('PDF Text Editor')),
        body: _isLoading
            ? const Center(child: CircularProgressIndicator())
            : Consumer<TextEditController>(
                builder: (context, controller, _) {
                  return Stack(
                    children: [
                      InlineTextRenderer(
                        pageImage: _pageImage,
                        editedTextSpans: controller.editedSpans,
                      ),
                      InteractiveTextOverlay(
                        textSpans: controller.editedSpans,
                        onTextChanged: controller.updateSpan,
                      ),
                    ],
                  );
                },
              ),
      ),
    );
  }
}
