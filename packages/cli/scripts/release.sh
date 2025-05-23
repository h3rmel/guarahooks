#!/bin/bash

# Release script for guarahooks-cli
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the CLI package directory."
    exit 1
fi

# Check if we're in the CLI package
if ! grep -q "guarahooks-cli" package.json; then
    print_error "This doesn't appear to be the guarahooks-cli package directory."
    exit 1
fi

# Get version type from argument
VERSION_TYPE=${1:-patch}

if [ "$VERSION_TYPE" != "patch" ] && [ "$VERSION_TYPE" != "minor" ] && [ "$VERSION_TYPE" != "major" ]; then
    print_error "Invalid version type. Use: patch, minor, or major"
    echo "Usage: $0 [patch|minor|major]"
    exit 1
fi

print_status "Starting release process for version: $VERSION_TYPE"

# Check if we have uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit or stash them first."
    git status --short
    exit 1
fi

# Make sure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "You're not on the main branch. Current branch: $CURRENT_BRANCH"
    read -p "Do you want to continue? (y/N): " -r
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run tests and build
print_status "Running type check..."
pnpm typecheck

print_status "Building package..."
pnpm build

# Test the package locally
print_status "Testing package installation..."
pnpm test:install

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "Current version: $CURRENT_VERSION"

# Bump version
print_status "Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
print_status "New version: $NEW_VERSION"

# Commit version bump
git add package.json
git commit -m "chore(cli): bump version to $NEW_VERSION"

# Create git tag
git tag -a "cli-v$NEW_VERSION" -m "Release guarahooks-cli v$NEW_VERSION"

# Dry run publish
print_status "Running publish dry run..."
pnpm publish:dry

# Confirm publish
print_warning "Ready to publish guarahooks-cli v$NEW_VERSION to NPM"
read -p "Do you want to proceed with publishing? (y/N): " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Publishing cancelled. Version was bumped but not published."
    print_status "To publish later, run: pnpm publish:latest"
    exit 0
fi

# Publish to NPM
print_status "Publishing to NPM..."
pnpm publish:latest

# Push to git
print_status "Pushing changes to git..."
git push origin $CURRENT_BRANCH
git push origin "cli-v$NEW_VERSION"

print_status "🎉 Successfully released guarahooks-cli v$NEW_VERSION!"
print_status "Package is now available at: https://www.npmjs.com/package/guarahooks-cli" 