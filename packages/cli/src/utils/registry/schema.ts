import { z } from 'zod';

export const hookFileSchema = z.object({
  name: z.string(),
  content: z.string(),
  type: z.enum(['hook', 'util', 'type', 'test']),
});

export const hookExampleSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export const hookRegistrySchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum([
    'state',
    'effect',
    'utility',
    'dom',
    'animation',
    'timer',
    'network',
    'browser',
    'form',
  ]),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  hookDependencies: z.array(z.string()).optional(),
  files: z.array(hookFileSchema),
  examples: z.array(hookExampleSchema).optional(),
  tags: z.array(z.string()).optional(),
});

export const registryIndexSchema = z.object({
  hooks: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      category: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  ),
  categories: z.record(z.string(), z.array(z.string())),
});

export type HookFile = z.infer<typeof hookFileSchema>;
export type HookExample = z.infer<typeof hookExampleSchema>;
export type HookRegistry = z.infer<typeof hookRegistrySchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;

export const HOOK_CATEGORIES = {
  state: ['useToggle', 'useCounter', 'useLocalStorage'],
  effect: ['useInterval', 'useTimeout', 'useDebounce'],
  dom: ['useKeypress', 'useMouse', 'useWindowSize'],
  utility: ['useFetch', 'useAsync', 'usePrevious'],
  browser: ['useOS', 'useIdle', 'useOnlineStatus'],
  timer: ['useInterval', 'useTimeout'],
  network: ['useFetch'],
  animation: [],
  form: [],
} as const;
