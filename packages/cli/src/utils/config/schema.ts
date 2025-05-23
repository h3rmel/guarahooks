import { z } from 'zod';

export const guarahooksConfigSchema = z.object({
  $schema: z.string().optional(),
  framework: z.enum(['react', 'next', 'vite']),
  typescript: z.boolean().default(true),
  aliases: z.object({
    hooks: z.string().default('@/hooks'),
    utils: z.string().default('@/lib/utils'),
  }),
  importStyle: z.enum(['named', 'default']).default('named'),
  includeTests: z.boolean().default(false),
  includeExamples: z.boolean().default(false),
});

export type GuarahooksConfig = z.infer<typeof guarahooksConfigSchema>;

export const DEFAULT_CONFIG: GuarahooksConfig = {
  framework: 'react',
  typescript: true,
  aliases: {
    hooks: '@/hooks',
    utils: '@/lib/utils',
  },
  importStyle: 'named',
  includeTests: false,
  includeExamples: false,
};
