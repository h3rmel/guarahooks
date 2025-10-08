import { checkbox } from '@inquirer/prompts';

import { logger } from '@/src/utils/logger';
import {
  getAllCategories,
  groupHooksByCategory,
  type Hook,
} from '@/src/utils/registry';

interface CheckboxChoice {
  name: string;
  value: string;
  checked?: boolean;
}

export async function showInteractiveSelection(
  hooks: Hook[],
): Promise<string[]> {
  const hooksByCategory = groupHooksByCategory(hooks);
  const categories = getAllCategories(hooks);

  const choices = buildChoices(hooksByCategory, categories);
  const selectableChoices = filterSelectableChoices(choices);

  displayAvailableHooks();

  const selectedValues = await checkbox({
    message: 'Select hooks to install:',
    choices: selectableChoices,
    pageSize: 15,
  });

  return selectedValues;
}

function buildChoices(
  hooksByCategory: Record<string, Hook[]>,
  categories: string[],
): CheckboxChoice[] {
  const choices: CheckboxChoice[] = [];

  // Group hooks by category
  categories.forEach((category, index) => {
    // Add spacing except for the first category
    if (index > 0) {
      choices.push({
        name: '',
        value: `spacing-${index}`,
        checked: false,
      });
    }

    // Add category header
    const categoryTitle = formatCategoryTitle(category);

    choices.push({
      name: `📂 ${categoryTitle}`,
      value: `header-${category}`,
      checked: false,
    });

    // Add hooks in this category
    hooksByCategory[category].forEach((hook) => {
      choices.push({
        name: `${hook.name}`,
        value: hook.name,
        checked: false,
      });
    });
  });

  return choices;
}

function filterSelectableChoices(choices: CheckboxChoice[]): CheckboxChoice[] {
  return choices.filter(
    (choice) =>
      !choice.value.startsWith('separator-') &&
      !choice.value.startsWith('header-') &&
      !choice.value.startsWith('spacing-'),
  );
}

function displayAvailableHooks(): void {
  logger.log('📦 Available Hooks:');
  logger.log('Use ↑ ↓ to navigate, space to select, enter to confirm');
  logger.break();
}

function formatCategoryTitle(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
