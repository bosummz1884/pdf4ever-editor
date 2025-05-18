// src/components/FontMatchingService.js

import opentype from 'opentype.js';

export async function detectFontFromBuffer(arrayBuffer) {
  try {
    const font = opentype.parse(arrayBuffer);
    return {
      familyName: font.names.fullName.en,
      style: font.names.fontSubfamily ? font.names.fontSubfamily.en : 'Regular',
      weight: font.tables.os2.usWeightClass,
      width: font.tables.os2.usWidthClass,
      isItalic: font.tables.post.italicAngle !== 0
    };
  } catch (err) {
    console.error('Font detection failed:', err);
    return null;
  }
}

export async function matchFont(fontList, targetFontName) {
  // Basic fuzzy matching by font family name
  const lowerTarget = targetFontName.toLowerCase();
  const closest = fontList.find((font) =>
    font.familyName.toLowerCase().includes(lowerTarget)
  );
  return closest || fontList[0]; // fallback
}
