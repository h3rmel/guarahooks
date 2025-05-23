import fetch from 'node-fetch';

import {
  hookRegistrySchema,
  registryIndexSchema,
  type HookRegistry,
  type RegistryIndex,
} from './schema.js';

const REGISTRY_URL = 'https://registry.guarahooks.com';

export async function getRegistryIndex(): Promise<RegistryIndex> {
  try {
    const response = await fetch(`${REGISTRY_URL}/index.json`);

    if (!response.ok) {
      throw new Error(`Failed to fetch registry index: ${response.statusText}`);
    }

    const data = await response.json();
    return registryIndexSchema.parse(data);
  } catch (error) {
    console.warn('Failed to fetch registry index, using fallback');
    return getFallbackIndex();
  }
}

export async function fetchHook(name: string): Promise<HookRegistry> {
  try {
    const response = await fetch(`${REGISTRY_URL}/hooks/${name}.json`);

    if (!response.ok) {
      throw new Error(`Failed to fetch hook ${name}: ${response.statusText}`);
    }

    const data = await response.json();
    return hookRegistrySchema.parse(data);
  } catch (error) {
    console.warn(`Failed to fetch hook ${name}, using fallback`);
    return getFallbackHook(name);
  }
}

export async function resolveHookDependencies(
  hooks: string[],
): Promise<string[]> {
  const resolved = new Set<string>();
  const queue = [...hooks];

  while (queue.length > 0) {
    const hookName = queue.shift()!;

    if (resolved.has(hookName)) continue;

    resolved.add(hookName);

    try {
      const hook = await fetchHook(hookName);

      if (hook.hookDependencies) {
        for (const dep of hook.hookDependencies) {
          if (!resolved.has(dep)) {
            queue.push(dep);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to resolve dependencies for ${hookName}`);
    }
  }

  return Array.from(resolved);
}

function getFallbackIndex(): RegistryIndex {
  return {
    hooks: [
      {
        name: 'useToggle',
        description: 'Toggle boolean state',
        category: 'state',
      },
      {
        name: 'useCounter',
        description: 'Counter with increment/decrement',
        category: 'state',
      },
      {
        name: 'useKeypress',
        description: 'Listen to keypress events',
        category: 'dom',
      },
      {
        name: 'useIdle',
        description: 'Detect user idle state',
        category: 'browser',
      },
      {
        name: 'useWindowSize',
        description: 'Get window dimensions',
        category: 'dom',
      },
      {
        name: 'useMouse',
        description: 'Track mouse position',
        category: 'dom',
      },
      {
        name: 'useInterval',
        description: 'setInterval hook',
        category: 'timer',
      },
      {
        name: 'useOS',
        description: 'Detect operating system',
        category: 'browser',
      },
      { name: 'useTimeout', description: 'setTimeout hook', category: 'timer' },
      {
        name: 'useFetch',
        description: 'Fetch data with loading states',
        category: 'network',
      },
    ],
    categories: {
      state: ['useToggle', 'useCounter'],
      dom: ['useKeypress', 'useWindowSize', 'useMouse'],
      browser: ['useIdle', 'useOS'],
      timer: ['useInterval', 'useTimeout'],
      network: ['useFetch'],
      utility: [],
      effect: [],
      animation: [],
      form: [],
    },
  };
}

function getFallbackHook(name: string): HookRegistry {
  return {
    name,
    description: `A ${name} hook`,
    category: 'utility',
    files: [
      {
        name: `${name}.ts`,
        content: `// Fallback implementation for ${name}\nexport function ${name}() {\n  // TODO: Implement\n}`,
        type: 'hook',
      },
    ],
  };
}
