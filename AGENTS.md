# stacey.vetzal.com - Site Repository

This is the Gatsby site repository for [stacey.vetzal.com](https://stacey.vetzal.com) — Stacey Vetzal's personal blog ("Stacey on Software").

## Repository Structure

```
stacey-blog/                  # This repo (git@github.com:svetzal/stacey.vetzal.com.git)
├── content/                  # Git submodule → https://github.com/svetzal/blog-content.git
│   ├── posts/YYYY/           # Blog posts organized by year
│   ├── assets/               # Shared assets (avatar, icons)
│   ├── AGENTS.md             # Content-specific agent instructions
│   └── .claude/              # Claude Code skills for content work
├── src/                      # Gatsby theme customizations
├── gatsby-config.js          # Site configuration
├── amplify.yml               # AWS Amplify build spec
├── publish.sh                # Publish script (see below)
└── AGENTS.md                 # This file
```

## Two-Repo Architecture

- **This repo** holds the Gatsby site scaffolding, theme config, and deployment pipeline.
- **`content/`** is a git submodule pointing to `blog-content.git`, which holds all markdown posts, images, and content-authoring skills.
- Content work (writing posts, generating images) happens in `content/` as an independent repo.
- This parent repo tracks which commit of `content/` to build against.

## Publishing / Deployment

Pushing to `master` on this repo triggers an AWS Amplify build that runs `yarn run build` (Gatsby) and deploys to [stacey.vetzal.com](https://stacey.vetzal.com).

### Publish Workflow

Run `./publish.sh` from this repo's root:

```bash
./publish.sh                          # Uses default commit message
./publish.sh "New post on TDD"        # Custom commit message for content
```

The script:

1. Commits and pushes any pending changes in `content/`
2. Updates the submodule ref in this parent repo
3. Commits and pushes the parent repo, triggering Amplify deploy

### Manual Publish Steps (if needed)

```bash
# 1. Commit and push content
cd content
git add -A && git commit -m "Content updates" && git push

# 2. Update submodule ref and push parent
cd ..
git submodule update --remote --recursive
git add content && git commit -m "Update content submodule" && git push
```

## Development

Content authors should open Claude Code in the `content/` subdirectory, not in this parent repo. The content repo has its own AGENTS.md with writing guidelines, image generation skills, and content conventions.

For site framework changes (Gatsby config, theme customizations, build pipeline), work in this parent repo directly.
