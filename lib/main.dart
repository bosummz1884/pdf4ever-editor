import 'package:flutter/material.dart';
import 'package:pdf4ever/screens/upload_screen.dart';
import 'package:pdf4ever/services/font_loader.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FontLoaderService.loadFonts(); // Load all 54 TTF fonts before anything else
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'PDF4EVER',
      theme: ThemeData.dark(),
      home: const UploadScreen(), // ✅ This is the screen you posted
    );
  }
}
