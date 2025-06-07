// File: src/utils/tagUtils.ts

// This map links a lowercase tag name to a set of Tailwind CSS classes.
const tagColorMap: Record<string, string> = {
  'ia': 'bg-blue-200 text-blue-800',
  'tecnología': 'bg-emerald-200 text-emerald-800',
  'futuro': 'bg-violet-200 text-violet-800',
  'innovación': 'bg-amber-200 text-amber-800',
  'reflexión': 'bg-pink-200 text-pink-800',
  'programación': 'bg-sky-200 text-sky-800',
  'ciencia': 'bg-rose-200 text-rose-800',
  'opinión': 'bg-indigo-200 text-indigo-800',
  // Add more of your common tags here
};

// A default style for any tags that aren't in our map.
const defaultClasses = 'bg-gray-200 text-gray-800';

/**
 * Returns the appropriate Tailwind classes for a given tag.
 * @param tagName The name of the tag (e.g., "IA", "Tecnología")
 * @returns A string of Tailwind CSS classes.
 */
export function getTagClasses(tagName: string): string {
  const normalizedTag = tagName.toLowerCase();
  return tagColorMap[normalizedTag] || defaultClasses;
}