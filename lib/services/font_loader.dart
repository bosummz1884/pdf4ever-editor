import 'package:flutter/services.dart';
import 'package:pdf/widgets.dart' as pw;

class FontLoaderService {
  static final Map<String, pw.Font> _loadedFonts = {};

  static Future<void> loadFonts() async {
    final fonts = {
      'arial': 'assets/fonts/Arial.ttf',
      'arialblack': 'assets/fonts/ArialBlack.ttf',
      'verdana': 'assets/fonts/Verdana.ttf',
      'tahoma': 'assets/fonts/Tahoma.ttf',
      'trebuchetms': 'assets/fonts/TrebuchetMS.ttf',
      'timesnewroman': 'assets/fonts/TimesNewRoman.ttf',
      'georgia': 'assets/fonts/Georgia.ttf',
      'palatinolinotype': 'assets/fonts/PalatinoLinotype.ttf',
      'garamond': 'assets/fonts/Garamond.ttf',
      'couriernew': 'assets/fonts/CourierNew.ttf',
      'lucidaconsole': 'assets/fonts/LucidaConsole.ttf',
      'lucidasansunicode': 'assets/fonts/LucidaSansUnicode.ttf',
      'impact': 'assets/fonts/Impact.ttf',
      'comicsansms': 'assets/fonts/ComicSansMS.ttf',
      'calibri': 'assets/fonts/Calibri.ttf',
      'cambria': 'assets/fonts/Cambria.ttf',
      'candara': 'assets/fonts/Candara.ttf',
      'constantia': 'assets/fonts/Constantia.ttf',
      'corbel': 'assets/fonts/Corbel.ttf',
      'segoeui': 'assets/fonts/SegoeUI.ttf',
      'helvetica': 'assets/fonts/Helvetica.ttf',
      'helveticaneue': 'assets/fonts/HelveticaNeue.ttf',
      'gillsans': 'assets/fonts/GillSans.ttf',
      'futura': 'assets/fonts/Futura.ttf',
      'franklingothicmedium': 'assets/fonts/FranklinGothicMedium.ttf',
      'centurygothic': 'assets/fonts/CenturyGothic.ttf',
      'bookantiqua': 'assets/fonts/BookAntiqua.ttf',
      'baskerville': 'assets/fonts/Baskerville.ttf',
      'rockwell': 'assets/fonts/Rockwell.ttf',
      'bodonimt': 'assets/fonts/BodoniMT.ttf',
      'avenir': 'assets/fonts/Avenir.ttf',
      'optima': 'assets/fonts/Optima.ttf',
      'didot': 'assets/fonts/Didot.ttf',
      'univers': 'assets/fonts/Univers.ttf',
      'myriadpro': 'assets/fonts/MyriadPro.ttf',
      'minionpro': 'assets/fonts/MinionPro.ttf',
      'neuehaasgrotesk': 'assets/fonts/NeueHaasGrotesk.ttf',
      'proximanova': 'assets/fonts/ProximaNova.ttf',
      'lato': 'assets/fonts/Lato.ttf',
      'montserrat': 'assets/fonts/Montserrat.ttf',
      'roboto': 'assets/fonts/Roboto-Regular.ttf',
      'opensans': 'assets/fonts/OpenSans.ttf',
      'notosans': 'assets/fonts/NotoSans.ttf',
      'raleway': 'assets/fonts/Raleway.ttf',
      'sourcesanspro': 'assets/fonts/SourceSansPro.ttf',
      'ptsans': 'assets/fonts/PTSans.ttf',
      'poppins': 'assets/fonts/Poppins.ttf',
      'inter': 'assets/fonts/Inter.ttf',
      'ubuntu': 'assets/fonts/Ubuntu.ttf',
      'merriweather': 'assets/fonts/Merriweather.ttf',
    };

    for (final entry in fonts.entries) {
      final data = await rootBundle.load(entry.value);
      _loadedFonts[entry.key] = pw.Font.ttf(data);
    }
  }

  static pw.Font getFont(String fontName) {
    final key = fontName.toLowerCase().replaceAll(RegExp(r'[^a-z]'), '');
    return _loadedFonts[key] ?? _loadedFonts['roboto']!;
  }
}
