// File: src/utils/icons.js

// System 1: Automatically import all .svg files from the icons directory.
// `as: 'raw'` tells Astro to import the file content as a raw text string.
const fileBasedIcons = import.meta.glob('/src/assets/icons/*.svg', { as: 'raw' });

// System 2: A map for simple, hardcoded icons.
const hardcodedIcons = {
  'hourglass': {
    svgContent: `<path d="M6 2v2h.01L6 8a2 2 0 0 0 1.274 1.857L8.5 10.5a1 1 0 0 1 0 1L7.274 12.143A2 2 0 0 0 6 14v4h12v-4a2 2 0 0 0-1.274-1.857L15.5 11.5a1 1 0 0 1 0-1l1.226-.643A2 2 0 0 0 18 8V2H6z"/>`,
    viewBox: "0 0 24 24"
  },
  'clock': {
    svgContent: `<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>`,
    viewBox: "0 0 24 24"
  },
  // ... you can keep your other hardcoded icons here if you want
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