import { RegistryItem } from 'shadcn/registry';

import { examples } from '@/registry/registry-examples';
import { hooks } from '@/registry/registry-hooks';

export const getHooksByNames = (names: string[]): RegistryItem[] => {
  const hooksMap = new Map(hooks.map((hook) => [hook.name, hook]));

  return names
    .map((name) => hooksMap.get(name))
    .filter(Boolean)
    .filter((hook): hook is RegistryItem => Boolean(hook));
};

export const getHooksExamplesByNames = (names: string[]): RegistryItem[] => {
  const hooksExamplesMap = new Map(
    examples.map((example) => [example.name, example]),
  );

  return names
    .map((name) => hooksExamplesMap.get(`${name}-demo`))
    .filter((hook): hook is RegistryItem => Boolean(hook));
};

export const getHooksCount = (): number => {
  return hooks.length;
};

export const convertRegistryPaths = (content: string): string => {
  return content
    .replace(/@\/registry\/hooks/g, '@/hooks/guarahooks')
    .replace(/@\/registry\/example/g, '@/components/examples');
};
