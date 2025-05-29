const KEY = 'pdf4ever-annotations';

/**
 * Save annotation JSON data (per page, per doc)
 * @param {string} docId - unique identifier for a loaded PDF
 * @param {Object} data - annotation data to store
 */
export function saveAnnotations(docId, data) {
  const existing = JSON.parse(localStorage.getItem(KEY) || '{}');
  existing[docId] = data;
  localStorage.setItem(KEY, JSON.stringify(existing));
}

/**
 * Load annotations for a specific document
 * @param {string} docId
 * @returns {Object|null}
 */
export function loadAnnotations(docId) {
  const store = JSON.parse(localStorage.getItem(KEY) || '{}');
  return store[docId] || null;
}

/**
 * Clear all saved annotations (optional debug method)
 */
export function clearAllAnnotations() {
  localStorage.removeItem(KEY);
}
