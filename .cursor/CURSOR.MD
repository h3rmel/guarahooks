# Project Context - GuaraHooks

## Overview

This project uses a structured workflow to facilitate collaboration between human and AI in executing development tasks.

## Workflow Structure

### 📁 Folder Structure

```
.cursor/
├── CURSOR.MD           # This file - context and instructions
├── stories/            # Technical task documents (written by human)
├── changelog/          # Implementation records (written by AI)
└── rules/              # Project rules and standards
```

### 🔄 Work Process

1. **Planning**: Human creates a `.md` file in `stories/` folder describing the task
2. **Execution**: AI executes the task following story specifications
3. **Documentation**: AI creates a `.md` file in `changelog/` folder documenting the implementation

### 📝 Naming Standards

#### Stories
- Format: `YYYY-MM-DD-task-name.md`
- Example: `2024-01-15-implement-hook-useLocalStorage.md`

#### Changelog
- Format: `YYYY-MM-DD-task-name-CHANGELOG.md`
- Example: `2024-01-15-implement-hook-useLocalStorage-CHANGELOG.md`

### 🎯 Execution Principles

1. **Clarity**: All implementations must be clear and well documented
2. **Modularity**: Code should be modular and reusable
3. **Testability**: Implementations should include tests when appropriate
4. **Traceability**: Every change should be traceable through changelog
5. **Quality**: Follow established TypeScript coding standards

### 🛠 Tools and Technologies

- **Primary Language**: TypeScript
- **Secondary Languages**: N/A
- **Package Manager**: pnpm
- **Version Control**: Git
- **Documentation**: Markdown

### 📋 Templates

- **Story Template**: Located at `stories/_template.md`
- **Changelog Template**: Located at `changelog/_template.md`

### ⚡ Useful Commands

```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add <package-name>

# Run tests
pnpm test

# Build project
pnpm build
```

### 🔍 References

- Check files in `rules/` for project-specific standards
- Active stories are in `stories/`
- Implementation history in `changelog/` 