# Guarahooks CLI

A powerful CLI for installing and managing guarahooks - React hooks library.

## Installation

```bash
# Install globally
npm install -g guarahooks-cli

# Or use with npx
npx guarahooks-cli <command>
```

## Usage

### Initialize Project

Initialize guarahooks in your project with interactive prompts:

```bash
guarahooks-cli init
```

Use default configuration:

```bash
guarahooks-cli init --yes
```

### Add Hooks

Add specific hooks:

```bash
guarahooks-cli add useToggle useCounter
```

Add all hooks from a category:

```bash
guarahooks-cli add --category state
```

Add all available hooks:

```bash
guarahooks-cli add --all
```

Interactive selection:

```bash
guarahooks-cli add
```

Include examples and tests:

```bash
guarahooks-cli add useToggle --examples --tests
```

Dry run (see what would be installed):

```bash
guarahooks-cli add useToggle --dry-run
```

### List Available Hooks

List all hooks:

```bash
guarahooks-cli list
```

Filter by category:

```bash
guarahooks-cli list --category state
```

Search hooks:

```bash
guarahooks-cli list --search toggle
```

### Open Documentation

Open general documentation:

```bash
guarahooks-cli docs
```

Open specific hook documentation:

```bash
guarahooks-cli docs useToggle
```

## Configuration

The CLI uses a `guarahooks.json` configuration file:

```json
{
  "framework": "react",
  "typescript": true,
  "aliases": {
    "hooks": "@/hooks",
    "utils": "@/lib/utils"
  },
  "importStyle": "named",
  "includeTests": false,
  "includeExamples": false
}
```

### Configuration Options

- **framework**: `"react" | "next" | "vite"` - Your framework
- **typescript**: `boolean` - Whether to use TypeScript
- **aliases**: Object with import path aliases
- **importStyle**: `"named" | "default"` - Import style preference
- **includeTests**: `boolean` - Include test files by default
- **includeExamples**: `boolean` - Include example files by default

## Hook Categories

- **state**: State management hooks (useToggle, useCounter, etc.)
- **dom**: DOM interaction hooks (useKeypress, useWindowSize, etc.)
- **browser**: Browser API hooks (useOS, useIdle, etc.)
- **timer**: Timer-based hooks (useInterval, useTimeout, etc.)
- **network**: Network-related hooks (useFetch, etc.)
- **utility**: Utility hooks
- **effect**: Effect-based hooks
- **animation**: Animation hooks
- **form**: Form-related hooks

## Examples

### Basic Setup

```bash
# Initialize project
npx guarahooks-cli init

# Add some commonly used hooks
npx guarahooks-cli add useToggle useCounter useKeypress

# List all available hooks
npx guarahooks-cli list
```

### Advanced Usage

```bash
# Add all state management hooks with examples
npx guarahooks-cli add --category state --examples

# Search and add hooks
npx guarahooks-cli list --search "window"
npx guarahooks-cli add useWindowSize

# Open documentation for a specific hook
npx guarahooks-cli docs useToggle
```

## Development

```bash
# Clone the repository
git clone https://github.com/h3rmel/guarahooks.git
cd guarahooks/packages/cli

# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Test locally
node dist/index.js --help

# Run in development mode with watch
pnpm dev
```

## Publishing

### Quick Release (Automated)

Use the automated release script from the CLI package directory:

```bash
# Patch release (0.1.0 -> 0.1.1)
pnpm release:auto:patch

# Minor release (0.1.0 -> 0.2.0)
pnpm release:auto:minor

# Major release (0.1.0 -> 1.0.0)
pnpm release:auto:major

# Interactive release (default: patch)
pnpm release
```

### Manual Release

For more control over the release process:

```bash
# 1. Build and test
pnpm build
pnpm typecheck

# 2. Test package installation
pnpm test:install

# 3. Dry run publish to check everything looks good
pnpm publish:dry

# 4. Bump version
pnpm version:patch   # or version:minor, version:major

# 5. Publish to NPM
pnpm publish:latest  # or publish:beta for beta releases
```

### From Root Directory

You can also run release commands from the project root:

```bash
# Automated releases
pnpm release:cli:auto:patch
pnpm release:cli:auto:minor
pnpm release:cli:auto:major

# Manual releases
pnpm publish:cli:dry
pnpm publish:cli:latest
pnpm publish:cli:beta
```

### Pre-release Checklist

Before publishing, ensure:

- [ ] All tests pass
- [ ] Code is properly formatted and linted
- [ ] Version number is correct
- [ ] CHANGELOG is updated (if applicable)
- [ ] No uncommitted changes
- [ ] On the correct branch (usually `main`)

### NPM Authentication

Make sure you're logged in to NPM:

```bash
npm login
npm whoami  # Verify you're logged in
```

## License

MIT License - see [LICENSE](../../LICENSE) for details.
