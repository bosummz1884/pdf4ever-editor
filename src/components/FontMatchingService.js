import opentype from 'opentype.js';

/**
 * Detect font metadata from a binary font buffer using opentype.js
 * @param {ArrayBuffer} buffer
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
 * Attempt to match a target font name against a fallback list
 * @param {string} targetName
 * @param {string[]} availableFonts
 * @returns {string}
 */
export function matchFont(targetName, availableFonts) {
  const lower = targetName.toLowerCase();
  const match = availableFonts.find(f => f.toLowerCase().includes(lower));
  return match || 'Helvetica';
}
