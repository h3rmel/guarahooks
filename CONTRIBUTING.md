# Contributing to guarahooks

Thank you for your interest in contributing to guarahooks! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new hook to guarahooks.

## Getting Started

Fork and clone the repository.

1. **Fork this repository**  
   Click [here](https://github.com/h3rmel/guarahooks/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/guarahooks.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd guarahooks
   ```

4. **Use Node.js 18**

   Ensure that you're using **Node.js 18**. If it's not installed, run `nvm install` and then `nvm use` to switch to the version defined in `.nvmrc`. You'll also need **pnpm 9.15.3** or newer installed globally.

5. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-branch
   ```

6. **Install dependencies**

   ```bash
   pnpm install
   ```

7. **Run the project**
   ```bash
   pnpm dev
   ```

## Adding a new Hook

To add a new Hook to guarahooks, you will need to modify and add several files. Follow these steps.

### 1. Create Hook

Create the main hook in `registry/hooks/use-example-hook.tsx`

```typescript
import React from 'react';

export function useExampleHook(initialState: string) {
  const [dummyState, setDummyState] = React.useState(initialState);

  return [dummyState, setDummyState];
}
```

### 2. Create Hook Demo

Provide a basic example to showcase your hook in `registry/example/use-example.hook.tsx`

```typescript
import { useExampleHook } from '@registry/hooks/use-example-hook';

export function useExampleHookDemo() {
  const { dummyState, handleClick } = useExampleHook();

  return (
    <div>
      <p>{dummyState}</p>
      <button onClick={() => handleClick()}>Click me</button>
    </div>
  );
}
```

### 3. Update Sidebar

Update the `config/docs.ts` with your new hook in the correct category.

```typescript
{
  title: 'Example Hook',
  href: '/docs/hooks/use-example-hook',
  items: [],
  label: 'New',
}
```

### 4. Create Docs

Create an MDX file for documenting your component in `content/docs/hooks/use-example-hook.mdx`

````md
---
title: Example Hook
date: 2025-04-23
description: Example hook for guarahooks
author: h3rmel
published: true
---

<HookPreview name="use-example-hook-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add "https://guarahooks.com/r/use-example-hook"
```

```

</TabsContent>
<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<HookSource name="use-example-hook" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

## Props

| Prop           | Type     | Default | Description                           |
| -------------- | -------- | ------- | ------------------------------------- |
| `initialState` | `string` | `""`    | The initial state of the dummy state. |

```
````

### 5. Update Registry

Export you hook and example in the registry files:

#### In `registry/registry-hooks.ts`:

```typescript
export const hooks: Registry['items'] = [
  // ... existing hooks ...
  {
    name: 'use-example-hook',
    type: 'registry:hook',
    title: 'UseExampleHook',
    description:
      'An hook to explain in step-by-step how to add a hook to guarahooks.',
    files: [
      {
        path: 'registry/hooks/use-example-hook.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-example-hook.tsx',
      },
    ],
  },
  // ... existing hooks ...
];
```

#### In `registry/registry-examples.ts`:

````typescript
import { Registry } from 'shadcn/registry';

export const examples: Registry['items'] = [
   // ... existing examples ...
  {
    name: 'use-example-hook-demo',
    type: 'registry:example',
    title: 'UseExampleHook Demo',
    description: 'use-example-hook in action.',
    registryDependencies: ['https://guarahooks.com/r/use-example-hook.json'],
    files: [
      {
        path: 'registry/example/use-example-hook-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-example-hook-demo.tsx',
      },
    ],
  },
     // ... existing examples ...

];

```
````

Make sure to add any necessary dependencies, configurations or other properties as needed for your specific hook.

### 5. Build Registry

```bash
pnpm build:registry
```

### 6. Format and fix linting before committing

```bash
pnpm format:write
```

```bash
pnpm lint:fix
```

Make sure to run these two commands before committing your changes.

## Adding a Showcase

### 1. Create the MDX file

Create the MDX file for your showcase at `content/showcases/website-name.mdx`:

```md
---
title: website-name.com
description: Website description
image: /showcase/website-name.png
href: https://website-name.com
featured: true
affiliation: YC S25, raised $10M
---
```

### 2. Update your image

Upload a banner image of your website in `public/showcase/website-name.png`

## Ask for Help

For any help or questions, please open a new GitHub issue.
