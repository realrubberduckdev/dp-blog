---
applyTo: "src/content/**/*.md"
description: "Blog post conventions for RubberDuckDev Gatsby blog"
---

# Blog Post Conventions

## Frontmatter Format

```yaml
---
layout: post
title: Descriptive Title Here
image: img/<post-slug>/banner.jpg
author: Dushyant
date: YYYY-MM-DDTHH:MM:SS.000Z
tags: ["PrimaryTag", "All"]
draft: false
---
```

## Rules

- Author is always `Dushyant`
- Tags must always include `"All"` as the last tag
- Known tags: Azure, DevOps, Docker, Git, GitHub, IaC, AI, Pulumi, Terraform, PowerShell, Exam, Conference, Kestrel
- Images go in `src/content/img/<post-slug>/`
- Post filename should be kebab-case matching the topic
- Add SEO description in a hidden div after frontmatter:
  ```html
  <div className="seo-hidden">
  One-line SEO description of the post.
  </div>
  ```

## Writing Style

- Technical, concise, first-person where needed
- Use markdown headers (h1 for title, h2+ for sections)
- Include code blocks with language tags
- Link to official documentation where relevant
- Use `---` horizontal rules to separate major sections
