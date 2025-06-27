# Plano de implementação – Abordagem Core + Plugins

Este documento descreve passo a passo como extrair um core enxuto de `useAxios` e adicionar funcionalidades avançadas via plugins.

## Fase 1 – Extrair Core Hook `useAxiosCore`

**Início da Fase 1**
1.1 Criar o arquivo `registry/hooks/use-axios-core.tsx`.
1.2 Implementar `useAxiosCore` com:

- Criação da instância Axios (`axios.create`).
- Estado gerenciado via `useReducer` para `loading`, `error` e `data`.
- Métodos básicos: `request`, `get`, `post`, `put`, `delete`, `patch`, `resetError`, `resetData`.
- **Sem** retry, cache, interceptors, progress, offline, polling ou batch.
  1.3 Testar fluxo básico:
- Exemplo de GET a uma API mock.
- Verificar transições `loading → data` e tratamento de erro.
  1.4 Documentar no README e em MDX de exemplos.
  **Fim da Fase 1**

## Fase 2 – Criar Plugins Independentes

**Início da Fase 2**
2.1 Plugin de Retry (`registry/hooks/plugins/withRetry.ts`)

- Função `withRetry<T>(core: UseAxiosReturn<T>, opts: RetryOptions): UseAxiosReturn<T>`.
- Envolve `core.request` com lógica de tentativas (`retryCount`, `retryDelay`, `backoffFactor`).
  2.2 Plugin de Cache & Dedup (`registry/hooks/plugins/withCache.ts`)
- Função `withCache<T>(core: UseAxiosReturn<T>, opts: CacheOptions): UseAxiosReturn<T>`.
- Implementa stale-while-revalidate e deduplicação de GET.
  2.3 Plugin de Offline Queue (`registry/hooks/plugins/withOffline.ts`)
- Função `withOffline<T>(core: UseAxiosReturn<T>): UseAxiosReturn<T>`.
- Enfileira requisições quando offline e dispara no evento `online`.
  2.4 Plugin de Autenticação (`registry/hooks/plugins/withAuth.ts`)
- Função `withAuth<T>(core: UseAxiosReturn<T>, opts: AuthOptions): UseAxiosReturn<T>`.
- Registra interceptors de token e 401 → refresh + retry.
  2.5 Plugin de Progress (`registry/hooks/plugins/withProgress.ts`)
- Função `withProgress<T>(core: UseAxiosReturn<T>): UseAxiosReturn<T>`.
- Adiciona suporte a `onUploadProgress` e `onDownloadProgress`.
  2.6 Testar cada plugin isoladamente com exemplos práticos.
  **Fim da Fase 2**

## Fase 3 – Compor Hook Avançado `useAxios`

**Início da Fase 3**
3.1 Criar `registry/hooks/use-axios-advanced.tsx` (ou sobrescrever `use-axios.tsx`).
3.2 Compor os módulos em cadeia, por exemplo:

```ts
let hook = useAxiosCore(propsCore);
if (retryCount)
  hook = withRetry(hook, { retryCount, retryDelay, backoffFactor });
if (cacheTime) hook = withCache(hook, { cacheTime, dedupe });
if (getAuthToken) hook = withAuth(hook, { getAuthToken, refreshAuth });
if (offlineQueue) hook = withOffline(hook);
if (enableProgress) hook = withProgress(hook);
return hook;
```

3.3 Ajustar `UseAxiosProps` para expor flags e opções de cada plugin.
3.4 Escrever demos MDX e testes de integração para fluxos básicos e avançados.
**Fim da Fase 3**

## Fase 4 – Migração e Depreciação do Monolito

**Início da Fase 4**
4.1 Atualizar todas as importações para usar o novo hook avançado ou `useAxiosCore` + plugins.
4.2 Marcar o antigo `use-axios.tsx` como deprecado (comentário ou aviso no README).
4.3 Após validação completa, remover o arquivo e referências do hook monolítico.
**Fim da Fase 4**
