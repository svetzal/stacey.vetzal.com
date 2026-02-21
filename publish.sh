#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Commit and push content submodule
cd "$REPO_ROOT/content"

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "${1:-Content updates}"
  echo "Content committed."
else
  echo "No content changes to commit."
fi

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
if [ "$LOCAL" != "$REMOTE" ]; then
  git push
  echo "Content pushed."
else
  echo "Content already up to date with remote."
fi

# Step 2: Update submodule ref in parent and push
cd "$REPO_ROOT"
git submodule update --remote --recursive

if [ -n "$(git status --porcelain)" ]; then
  git add content
  git commit -m "Update content submodule"
  git push
  echo "Site deploy triggered."
else
  echo "Parent repo already at latest content. Nothing to deploy."
fi
