// src/components/FontMatchingService.js

import opentype from 'opentype.js';

/**
 * Detects font metadata from a font file buffer using opentype.js
 * @param {ArrayBuffer} buffer - The binary font data
 * @returns {Object|null}
 */
export async function detectFontFromBuffer(buffer) {
  try {
    const font = opentype.parse(buffer);
    return {
      familyName: font.names.fullName?.en || 'Unknown',
      style: font.names.fontSubfamily?.en || 'Regular',
      weight: font.tables.os2?.usWeightClass || 400,
      isItalic: font.tables.post?.italicAngle !== 0,
    };
  } catch (err) {
    console.error('Font detection failed:', err);
    return null;
  }
}

/**
 * Matches a detected font to a known list (stubbed for now)
 * @param {string} targetName - Font name to match
 * @param {Array} fontList - Array of available fonts
 * @returns {string}
 */
export function matchFont(targetName, fontList) {
  const target = targetName.toLowerCase();
  const found = fontList.find(f => f.toLowerCase().includes(target));
  return found || 'Helvetica';
}

