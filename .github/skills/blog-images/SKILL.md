---
name: blog-images
description: "Manage blog post images and banner setup. Use when: setting up image directories, checking image references, organising post images."
---

# Blog Image Management

## Procedure

1. Create image directory at `src/content/img/<post-slug>/`
2. Verify frontmatter `image` field points to `img/<post-slug>/banner.jpg` (or `.png`)
3. Check all image references in the post body resolve to files in the image directory
4. Flag any broken image paths
