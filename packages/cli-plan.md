# Plano de Execução: CLI Guarahooks

Baseado na análise detalhada do Magic UI CLI, este é o plano completo para desenvolver uma CLI para a biblioteca **guarahooks** (https://guarahooks.com).

## **Visão Geral do Projeto**

A CLI guarahooks será uma ferramenta de linha de comando que permite:

- Inicializar projetos com configuração otimizada para hooks
- Instalar hooks específicos da biblioteca guarahooks
- Gerenciar dependências automaticamente
- Aplicar transformações de código baseadas na configuração do projeto

## **Fase 1: Estrutura Base do Projeto**

### **1.1 Setup Inicial**

```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── list.ts
│   │   └── docs.ts
│   ├── utils/
│   │   ├── config/
│   │   │   ├── get-config.ts
│   │   │   └── schema.ts
│   │   ├── registry/
│   │   │   ├── index.ts
│   │   │   └── schema.ts
│   │   ├── transformers/
│   │   │   ├── index.ts
│   │   │   ├── transform-imports.ts
│   │   │   ├── transform-framework.ts
│   │   │   └── transform-typescript.ts
│   │   ├── templates/
│   │   │   ├── hooks.ts
│   │   │   └── config.ts
│   │   ├── logger.ts
│   │   ├── package-manager.ts
│   │   └── project-info.ts
│   └── index.ts
├── package.json
├── tsup.config.ts
├── tsconfig.json
└── README.md
```

### **1.2 Dependências Essenciais**

- [ ] Configurar package.json com dependências:

  ```json
  {
    "name": "guarahooks-cli",
    "version": "0.1.0",
    "description": "CLI for installing and managing guarahooks - React hooks library",
    "bin": "./dist/index.js",
    "dependencies": {
      "commander": "^10.0.0",
      "prompts": "^2.4.2",
      "chalk": "5.2.0",
      "ora": "^6.1.2",
      "cosmiconfig": "^8.1.3",
      "execa": "^7.0.0",
      "fs-extra": "^11.1.0",
      "fast-glob": "^3.3.2",
      "ts-morph": "^18.0.0",
      "zod": "^3.20.2",
      "@babel/parser": "^7.22.6",
      "@babel/core": "^7.22.1",
      "tsconfig-paths": "^4.2.0",
      "gradient-string": "^2.0.2",
      "node-fetch": "^3.3.0"
    }
  }
  ```

- [ ] Configurar tsup para build
- [ ] Configurar TypeScript

## **Fase 2: Sistema de Configuração**

### **2.1 Schema de Configuração**

- [ ] Criar `src/utils/config/schema.ts`:
  ```typescript
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
  ```

### **2.2 Sistema de Configuração**

- [ ] Implementar `src/utils/config/get-config.ts`
- [ ] Suporte a arquivo `guarahooks.json`
- [ ] Resolução de paths com tsconfig
- [ ] Validação de configuração com Zod

## **Fase 3: Comando Init**

### **3.1 Estrutura do Comando**

- [ ] Criar `src/commands/init.ts`
- [ ] Implementar prompts interativos:
  ```typescript
  const initPrompts = [
    {
      type: 'select',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Next.js', value: 'next' },
        { title: 'Vite', value: 'vite' },
      ],
    },
    {
      type: 'toggle',
      name: 'typescript',
      message: 'Are you using TypeScript?',
      initial: true,
    },
    {
      type: 'text',
      name: 'hooksAlias',
      message: 'Configure import alias for hooks:',
      initial: '@/hooks',
    },
    {
      type: 'select',
      name: 'importStyle',
      message: 'Preferred import style?',
      choices: [
        {
          title: "Named imports: import { useToggle } from '@/hooks'",
          value: 'named',
        },
        {
          title: "Default imports: import useToggle from '@/hooks/useToggle'",
          value: 'default',
        },
      ],
    },
  ];
  ```

### **3.2 Funcionalidades do Init**

- [ ] Detectar projeto existente
- [ ] Criar arquivo `guarahooks.json`
- [ ] Configurar estrutura de diretórios
- [ ] Instalar dependências base:
  ```typescript
  const GUARAHOOKS_DEPENDENCIES = [
    'react',
    '@types/react', // se TypeScript
  ];
  ```

## **Fase 4: Sistema de Registry**

### **4.1 Schema dos Hooks**

- [ ] Criar `src/utils/registry/schema.ts`:
  ```typescript
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
    files: z.array(
      z.object({
        name: z.string(),
        content: z.string(),
        type: z.enum(['hook', 'util', 'type', 'test']),
      }),
    ),
    examples: z
      .array(
        z.object({
          name: z.string(),
          content: z.string(),
        }),
      )
      .optional(),
    tags: z.array(z.string()).optional(),
  });
  ```

### **4.2 Registry Implementation**

- [ ] Implementar `src/utils/registry/index.ts`
- [ ] Funções para fetch do registry:
  ```typescript
  export async function getRegistryIndex();
  export async function fetchHook(name: string);
  export async function resolveHookDependencies(hooks: string[]);
  ```

### **4.3 Registry Hosting**

- [ ] Definir URL do registry: `https://registry.guarahooks.com`
- [ ] Estrutura do registry:
  ```
  registry/
  ├── index.json          # Lista todos os hooks
  ├── hooks/
  │   ├── useToggle.json
  │   ├── useCounter.json
  │   ├── useKeypress.json
  │   ├── useIdle.json
  │   ├── useWindowSize.json
  │   ├── useMouse.json
  │   ├── useInterval.json
  │   ├── useOS.json
  │   ├── useTimeout.json
  │   ├── useFetch.json
  │   └── useToggle.json
  └── categories.json
  ```

## **Fase 5: Comando Add**

### **5.1 Estrutura do Comando**

- [ ] Criar `src/commands/add.ts`
- [ ] Opções do comando:
  ```typescript
  export const add = new Command()
    .name('add')
    .description('Add hooks to your project')
    .argument('[hooks...]', 'the hooks to add')
    .option('-a, --all', 'add all available hooks', false)
    .option('-c, --category <category>', 'add all hooks from a category')
    .option('-e, --examples', 'include example files', false)
    .option('-t, --tests', 'include test files', false)
    .option('--dry-run', 'show what would be installed', false);
  ```

### **5.2 Categorias de Hooks**

- [ ] Implementar sistema de categorias:
  ```typescript
  const HOOK_CATEGORIES = {
    state: ['useToggle', 'useCounter', 'useLocalStorage'],
    effect: ['useInterval', 'useTimeout', 'useDebounce'],
    dom: ['useKeypress', 'useMouse', 'useWindowSize'],
    utility: ['useFetch', 'useAsync', 'usePrevious'],
    browser: ['useOS', 'useIdle', 'useOnlineStatus'],
  };
  ```

### **5.3 Funcionalidades**

- [ ] Seleção interativa de hooks
- [ ] Resolução de dependências entre hooks
- [ ] Instalação de dependências NPM
- [ ] Aplicação de transformers
- [ ] Verificação de conflitos/sobrescrita

## **Fase 6: Sistema de Transformação**

### **6.1 Transformers Base**

- [ ] Criar `src/utils/transformers/index.ts`
- [ ] Implementar transformers:

  ```typescript
  // Transform imports baseado na configuração
  export const transformHookImports: Transformer;

  // Transform para diferentes frameworks
  export const transformFramework: Transformer;

  // Transform para JavaScript se não usar TypeScript
  export const transformToJS: Transformer;

  // Transform para diferentes estilos de import
  export const transformImportStyle: Transformer;
  ```

### **6.2 Templates**

- [ ] Criar `src/utils/templates/hooks.ts`:

  ```typescript
  export const HOOK_TEMPLATE = `import { useState, useCallback } from 'react';
  
  export function <%= hookName %>(<%= parameters %>) {
    // Hook implementation
    return <%= returnValue %>;
  }`;

  export const HOOK_TEST_TEMPLATE = `import { renderHook, act } from '@testing-library/react';
  import { <%= hookName %> } from './<%= hookName %>';
  
  describe('<%= hookName %>', () => {
    // Test implementation
  });`;
  ```

## **Fase 7: Comandos Auxiliares**

### **7.1 Comando List**

- [ ] Criar `src/commands/list.ts`:
  ```typescript
  export const list = new Command()
    .name('list')
    .description('List available hooks')
    .option('-c, --category <category>', 'filter by category')
    .option('-s, --search <term>', 'search hooks by name or description')
    .option('--table', 'display in table format', true);
  ```

### **7.2 Comando Docs**

- [ ] Criar `src/commands/docs.ts`:
  ```typescript
  export const docs = new Command()
    .name('docs')
    .description('Open documentation')
    .argument('[hook]', 'specific hook documentation')
    .action(async (hook) => {
      const url = hook
        ? `https://guarahooks.com/hooks/${hook}`
        : 'https://guarahooks.com';

      await execa('open', [url]);
    });
  ```

## **Fase 8: Interface e Branding**

### **8.1 ASCII Art & Logger**

- [ ] Criar `src/utils/logger.ts`
- [ ] Design do ASCII art:

  ```typescript
  const GUARAHOOKS_ASCII = `
    ███████╗██╗   ██╗ █████╗ ██████╗  █████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗
    ██╔════╝██║   ██║██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝
    ██║  ███╗██║   ██║███████║██████╔╝███████║███████║██║   ██║██║   ██║█████╔╝ ███████╗
    ██║   ██║██║   ██║██╔══██║██╔══██╗██╔══██║██╔══██║██║   ██║██║   ██║██╔═██╗ ╚════██║
    ╚███████║╚██████╔╝██║  ██║██║  ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝██║  ██╗███████║
     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
  `;

  const theme = {
    primary: '#3B82F6', // Blue
    secondary: '#8B5CF6', // Purple
    accent: '#10B981', // Green
  };
  ```

### **8.2 Help Text e Mensagens**

- [ ] Textos informativos
- [ ] Mensagens de erro amigáveis
- [ ] Indicadores de progresso
- [ ] Confirmações interativas

## **Fase 9: Arquivo Principal**

### **9.1 Entry Point**

- [ ] Criar `src/index.ts`:

  ```typescript
  #!/usr/bin/env node
  import { Command } from 'commander';

  import { add } from './commands/add';
  import { docs } from './commands/docs';
  import { init } from './commands/init';
  import { list } from './commands/list';

  const program = new Command()
    .name('guarahooks-cli')
    .description('CLI for installing and managing guarahooks')
    .version('0.1.0');

  program.addCommand(init).addCommand(add).addCommand(list).addCommand(docs);

  program.parse();
  ```

## **Fase 10: Testes e Documentação**

### **10.1 Testes**

- [ ] Testes unitários para utils
- [ ] Testes de integração para comandos
- [ ] Testes end-to-end

### **10.2 Documentação**

- [ ] README.md completo
- [ ] Exemplos de uso
- [ ] Guia de contribuição
- [ ] Changelog

## **Fase 11: Registry e Deploy**

### **11.1 Registry Setup**

- [ ] Criar estrutura do registry
- [ ] Popular com hooks do guarahooks:
  - useToggle
  - useKeypress
  - useIdle
  - useWindowSize
  - useMouse
  - useInterval
  - useOS
  - useTimeout
  - useFetch
- [ ] Deploy do registry

### **11.2 Package Deploy**

- [ ] Build final
- [ ] Publicação no NPM
- [ ] Testes de instalação

## **Timeline de Implementação**

### **Semana 1-2: Fundação**

- [x] Setup do projeto
- [ ] Sistema de configuração básico
- [ ] Comando init funcional

### **Semana 3-4: Core Features**

- [ ] Sistema de registry
- [ ] Comando add básico
- [ ] Transformers principais

### **Semana 5-6: Features Avançadas**

- [ ] Comando list
- [ ] Comando docs
- [ ] Sistema de categorias

### **Semana 7-8: Polish e Deploy**

- [ ] Testes completos
- [ ] Documentação
- [ ] Deploy no NPM

## **Comandos de Uso Final**

```bash
# Inicializar projeto
npx guarahooks-cli init

# Adicionar hooks específicos
npx guarahooks-cli add useToggle useCounter

# Adicionar por categoria
npx guarahooks-cli add --category state

# Adicionar todos os hooks
npx guarahooks-cli add --all

# Listar hooks disponíveis
npx guarahooks-cli list

# Buscar hooks
npx guarahooks-cli list --search "toggle"

# Adicionar com exemplos
npx guarahooks-cli add useToggle --examples

# Ver documentação
npx guarahooks-cli docs useToggle

# Ver documentação geral
npx guarahooks-cli docs
```

## **Considerações Técnicas**

### **Registry Hosting**

- Opção 1: GitHub Raw (temporário)
- Opção 2: Vercel API Routes
- Opção 3: Registry dedicado

### **Package Manager Support**

- npm
- yarn
- pnpm
- bun

### **Framework Support**

- React
- Next.js
- Vite
- Create React App

### **TypeScript/JavaScript**

- Suporte completo para ambos
- Transformações automáticas
- Preservação de tipos quando relevante

---

Este plano mantém a robustez e filosofia do Magic UI CLI, adaptado especificamente para o contexto de hooks React da biblioteca guarahooks.
