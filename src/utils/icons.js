// File: src/utils/icons.js

// System 1: Automatically import all .svg files from the icons directory.
// `as: 'raw'` tells Astro to import the file content as a raw text string.
const fileBasedIcons = import.meta.glob('/src/assets/icons/*.svg', { as: 'raw' });

// System 2: A map for simple, hardcoded icons.

const hardcodedIcons = {
  // Each path now includes fill, stroke, stroke-width, etc. to ensure correct rendering.
  'hourglass': {
    svgContent: `<path d="M6 2v2h.01L6 8a2 2 0 0 0 1.274 1.857L8.5 10.5a1 1 0 0 1 0 1L7.274 12.143A2 2 0 0 0 6 14v4h12v-4a2 2 0 0 0-1.274-1.857L15.5 11.5a1 1 0 0 1 0-1l1.226-.643A2 2 0 0 0 18 8V2H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    viewBox: "0 0 24 24"
  },
  'clock': {
    svgContent: `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12,6 12,12 16,14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    viewBox: "0 0 24 24"
  },
  'mail': {
    svgContent: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>`,
    viewBox: "0 0 24 24"
  },
  'send': {
    svgContent: `<line x1="22" y1="2" x2="11" y2="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    viewBox: "0 0 24 24"
  },
  'heart': {
    svgContent: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    viewBox: "0 0 24 24"
  },
  'coffee': {
    svgContent: `<path d="M18 8h1a4 4 0 0 1 0 8h-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="1" x2="6" y2="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="1" x2="10" y2="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="14" y1="1" x2="14" y2="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    viewBox: "0 0 24 24"
  },
  'chevron-left': {
    svgContent: `<path d="m15 18-6-6 6-6"/>`,
    viewBox: "0 0 24 24"
  },
  'chevron-right': {
    svgContent: `<path d="m9 18 6-6-6-6"/>`,
    viewBox: "0 0 24 24"
  },
   'target': {
    svgContent: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>`,
    viewBox: "0 0 24 24"
  },
};
/**
 * A unified function to get icon data from either a file or the hardcoded map.
 * @param {string} name - The name of the icon (e.g., "instagram", "hourglass").
 * @returns {Promise<{svgContent: string, viewBox: string}>}
 */
export async function getIcon(name) {
  const iconPath = `/src/assets/icons/${name}.svg`;

  // Priority 1: Check if a file exists for this icon name.
  if (fileBasedIcons[iconPath]) {
    const rawSvg = await fileBasedIcons[iconPath]();
    
    // Extract the inner content and viewBox from the raw SVG file.
    const viewBoxMatch = rawSvg.match(/viewBox="([^"]*)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    const contentMatch = rawSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
    const svgContent = contentMatch ? contentMatch[1] : '';

    return { svgContent, viewBox };
  }

  // Priority 2: If no file, check the hardcoded map.
  if (hardcodedIcons[name]) {
    return hardcodedIcons[name];
  }

  // If not found anywhere, log a warning and return a default.
  console.warn(`Icon "${name}" not found in files or hardcoded map.`);
  return {
    svgContent: `<circle cx="12" cy="12" r="2"/>`, // A default dot
    viewBox: "0 0 24 24"
  };
}