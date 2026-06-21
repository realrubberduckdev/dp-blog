---
description: "Generate a complete blog post from rough notes"
agent: "blog-writer"
tools: [read, edit, search]
argument-hint: "Paste your rough notes or topic outline"
---

Generate a blog post from the provided rough notes.

## Input

The user will provide rough notes which may include:
- Topic or title idea
- Key points or bullet points
- Code snippets
- Links to references
- Target tags

## Steps

1. Read [blog conventions](../instructions/blog-content.instructions.md)
2. Read 2-3 recent posts in `src/content/` to match style
3. Derive a kebab-case filename from the topic
4. Create the post with proper frontmatter (use today's date, author: Dushyant)
5. Expand rough notes into structured sections with headers
6. Add code blocks with correct language tags
7. Add the SEO hidden div
8. Create the image directory at `src/content/img/<post-slug>/`

Write the file to `src/content/<post-slug>.md`.
