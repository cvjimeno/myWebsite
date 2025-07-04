// src/utils/tagUtils.ts

// A map of categories to their specific Tailwind CSS classes.
const categoryColorMap: Record<string, string> = {
  'ia': 'bg-teal-100 text-teal-800 dark:bg-teal-900/70 dark:text-teal-300',
  'productividad': 'bg-rose-100 text-rose-800 dark:bg-rose-900/70 dark:text-rose-300',
  'programación': 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-300',
  'aprendizaje': 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300',
  'tecnología': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-300',
  'reflexión': 'bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300',
  'herramientas': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
  'ética': 'bg-pink-100 text-pink-800 dark:bg-pink-900/70 dark:text-pink-300',
};

const defaultCategoryClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

// A single, consistent style for all secondary tags.
export const neutralTagClasses = 'bg-bg-secondary text-text-secondary border border-border-card dark:bg-bg-primary';

/**
 * Returns the Tailwind classes for a given category.
 * @param category The category name.
 */
export function getCategoryClasses(category: string): string {
  return categoryColorMap[category.toLowerCase()] || defaultCategoryClasses;
}