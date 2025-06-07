// src/utils/icons.js
// src/utils/icons.js
import fs from 'node:fs/promises'; // Using Node.js fs module
import path from 'node:path';

// In a serverless/edge environment, you might use Astro.glob() instead for static analysis
// but for local dev with `astro dev`, Node.js fs can work if icons are in `src`.
// For production builds, Astro.glob() is more robust for assets in `src`.

// Let's try a more Astro-idiomatic way using Astro.glob for broader compatibility
const iconImports = import.meta.glob('/src/assets/icons/*.svg', { query: '?raw', import: 'default' });

// filepath: /src/utils/icons.js

const iconMap = {
  // Iconos existentes (mantén los que ya tienes)
  'hourglass': {
    svgContent: `<path d="M6 2v2h.01L6 8a2 2 0 0 0 1.274 1.857L8.5 10.5a1 1 0 0 1 0 1L7.274 12.143A2 2 0 0 0 6 14v4h12v-4a2 2 0 0 0-1.274-1.857L15.5 11.5a1 1 0 0 1 0-1l1.226-.643A2 2 0 0 0 18 8V2H6z"/>`,
    viewBox: "0 0 24 24"
  },
  
  // Nuevos iconos necesarios
  'clock': {
    svgContent: `<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>`,
    viewBox: "0 0 24 24"
  },
  
  'arrow-right': {
    svgContent: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>`,
    viewBox: "0 0 24 24"
  },
  
  'calendar': {
    svgContent: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    viewBox: "0 0 24 24"
  },
  
  'user': {
    svgContent: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    viewBox: "0 0 24 24"
  },
  
  // Iconos adicionales útiles para blogs
  'tag': {
    svgContent: `<path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19H5V5h10z"/><path d="M9 9h.01"/>`,
    viewBox: "0 0 24 24"
  },
  
  'eye': {
    svgContent: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    viewBox: "0 0 24 24"
  },
  
  'share': {
    svgContent: `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>`,
    viewBox: "0 0 24 24"
  },
  
  'bookmark': {
    svgContent: `<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>`,
    viewBox: "0 0 24 24"
  }
};

export async function getIcon(name) {
  const icon = iconMap[name];
  
  if (!icon) {
    console.warn(`Icon "${name}" not found. Available icons:`, Object.keys(iconMap));
    // Return a default icon or empty SVG
    return {
      svgContent: `<circle cx="12" cy="12" r="2"/>`, // Default dot
      viewBox: "0 0 24 24"
    };
  }
  
  return {
    svgContent: icon.svgContent,
    viewBox: icon.viewBox
  };
}
// export async function getIcon(name) {
//   const iconPath = `/src/assets/icons/${name}.svg`;
//   if (iconImports[iconPath]) {
//     const svgContent = await iconImports[iconPath](); // Returns a promise resolving to the raw SVG string

//     // Extract viewBox using a regular expression
//     const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
//     const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 256 256'; // Default viewBox

//     return { svgContent, viewBox };
//   }
//   console.warn(`Icon "${name}" not found.`);
//   return { svgContent: '', viewBox: '0 0 256 256' }; // Return empty string or a default placeholder SVG
// }