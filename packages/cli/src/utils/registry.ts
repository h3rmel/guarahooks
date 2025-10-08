import fetch from 'node-fetch';

import { registrySchema, type RegistryItem } from '@/src/registry/schemas';
import { handleError } from '@/src/utils/handle-error';

const REGISTRY_URL_DEV = 'http://localhost:3000/r/registry.json';
const REGISTRY_URL_PROD = 'https://guarahooks.com/r/registry.json';

export interface Hook {
  name: string;
  title: string;
  description: string;
  categories: string[];
}

export interface HooksByCategory {
  [category: string]: Hook[];
}

export async function fetchRegistry(): Promise<RegistryItem[]> {
  const registryUrl =
    process.env.NODE_ENV === 'development'
      ? REGISTRY_URL_DEV
      : REGISTRY_URL_PROD;

  try {
    const response = await fetch(registryUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }

    const data = await response.json();
    const parsed = registrySchema.parse(data);

    return parsed.items;
  } catch (error) {
    handleError(error);
    return [];
  }
}

export function filterHooks(items: RegistryItem[]): Hook[] {
  return items
    .filter((item) => item.type === 'registry:hook')
    .map((item) => ({
      name: item.name,
      title: item.title || item.name,
      description: item.description || '',
      categories: item.categories || [],
    }));
}

export function groupHooksByCategory(hooks: Hook[]): HooksByCategory {
  const grouped: HooksByCategory = {};

  hooks.forEach((hook) => {
    hook.categories.forEach((category) => {
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(hook);
    });
  });

  return grouped;
}

export function getAllCategories(hooks: Hook[]): string[] {
  const categories = new Set<string>();

  hooks.forEach((hook) => {
    hook.categories.forEach((category) => {
      categories.add(category);
    });
  });

  return Array.from(categories).sort();
}
