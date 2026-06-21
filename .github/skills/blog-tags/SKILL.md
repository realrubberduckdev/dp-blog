---
name: blog-tags
description: "Look up existing blog tags and suggest appropriate tags for new posts. Use when: tagging posts, checking available tags, categorising content."
---

# Blog Tags

## Procedure

1. Scan `src/content/*.md` frontmatter for all used tags
2. Cross-reference with `src/content/tag.yaml` for tag definitions
3. Suggest the most relevant tags for the given topic
4. Always include `"All"` as the final tag
