import { visit } from 'unist-util-visit';
import path from 'node:path';

/**
 * Remark plugin that rewrites relative image paths in blog posts.
 *
 * Posts reference images as `images/filename.png` (relative to the post file).
 * The images live in `content/posts/YYYY/images/`.
 * We rewrite them to absolute paths like `/YYYY/images/filename.png`
 * and serve the images from `public/YYYY/images/` via a prebuild copy step.
 */
export default function remarkResolveImages() {
  return (tree, vfile) => {
    // Extract the year directory from the file path
    // vfile.path is like: /path/to/content/posts/2026/2026-02-20-slug.md
    const filePath = vfile.path || vfile.history?.[0] || '';
    const match = filePath.match(/posts\/(\d{4})\//);
    if (!match) return;

    const year = match[1];

    visit(tree, 'image', (node) => {
      if (node.url && node.url.startsWith('images/')) {
        node.url = `/${year}/${node.url}`;
      }
    });
  };
}
