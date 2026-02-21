#!/usr/bin/env bash
# Copy post images from content submodule to public/ for static serving.
# Images in content/posts/YYYY/images/ are served at /YYYY/images/
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
POSTS_DIR="$REPO_ROOT/content/posts"
PUBLIC_DIR="$REPO_ROOT/public"

for year_dir in "$POSTS_DIR"/*/; do
  year=$(basename "$year_dir")
  if [ -d "$year_dir/images" ]; then
    mkdir -p "$PUBLIC_DIR/$year/images"
    cp -r "$year_dir/images/"* "$PUBLIC_DIR/$year/images/" 2>/dev/null || true
    echo "Copied images for $year"
  fi
done

echo "Post images copied to public/"
