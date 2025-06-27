# guara-cli

A CLI for installing hooks in your project.

## Requirements

The CLI requires **Node.js 18** or newer. It checks this at runtime. A pnpm version of **9.15.3** or newer is recommended. If you're working in this repository, run `nvm install` followed by `nvm use` from the project root to match the expected version. You can run the CLI via `npx` or install it globally:

```bash
pnpm add -g guara-cli
```

## Usage

No initialization needed—just start adding hooks to your project.

## add

Use the `add` command to install a hook and any required dependencies in your project.

```bash
npx guara-cli add [hook]
```

### Example

```bash
npx guara-cli add use-window-size
```

Run the command without arguments to list available hooks:

```bash
npx guara-cli add
```

## Documentation

Visit https://guarahooks.com/docs/cli to view the documentation.

## License

Licensed under the [MIT license](./LICENSE).
