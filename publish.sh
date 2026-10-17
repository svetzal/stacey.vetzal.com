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
fi

# Earlier work may already be committed even when the working tree is clean.
if [ "$(git rev-list --count @{u}..HEAD)" -gt 0 ]; then
  git push
  echo "Site deploy triggered."
else
  echo "Parent repo already pushed. Nothing to deploy."
fi
