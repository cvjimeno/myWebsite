// src/utils/icons.js
import fs from 'node:fs/promises'; // Using Node.js fs module
import path from 'node:path';

// In a serverless/edge environment, you might use Astro.glob() instead for static analysis
// but for local dev with `astro dev`, Node.js fs can work if icons are in `src`.
// For production builds, Astro.glob() is more robust for assets in `src`.

// Let's try a more Astro-idiomatic way using Astro.glob for broader compatibility
const iconImports = import.meta.glob('/src/assets/icons/*.svg', { as: 'raw' });

export async function getIcon(name) {
  const iconPath = `/src/assets/icons/${name}.svg`;
  if (iconImports[iconPath]) {
    const svgContent = await iconImports[iconPath](); // Returns a promise resolving to the raw SVG string

    // Extract viewBox using a regular expression
    const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 256 256'; // Default viewBox

    return { svgContent, viewBox };
  }
  console.warn(`Icon "${name}" not found.`);
  return { svgContent: '', viewBox: '0 0 256 256' }; // Return empty string or a default placeholder SVG
}