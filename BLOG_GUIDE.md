# Adding Blog Posts

This guide explains how to add new blog posts to your personal website.

## Overview

Your website uses Astro's content collections to manage blog posts. Blog posts are stored as Markdown/MDX files in the `src/content/blog/` directory.

## File Structure

```
src/
├── content/
│   └── blog/
│       ├── sea-cucumber-detection.mdx    # Example post
│       └── hsc3d-release.mdx             # Another example
```

## Creating a New Blog Post

### Step 1: Create the Blog File

Create a new file in `src/content/blog/` with a descriptive name. Use hyphens to separate words:

```bash
# Example: my-new-post.mdx
```

### Step 2: Add Frontmatter

Every blog post requires frontmatter at the top of the file. Copy this template:

```yaml
---
title: "Your Post Title Here"
description: "A brief description of your post (used for SEO and previews)"
date: 2025-01-15
tags: ["Tag1", "Tag2", "Tag3"]
draft: false
image: "/path/to/image.jpg"  # Optional: for social media sharing
---
```

### Step 3: Write Your Content

After the frontmatter, write your blog content using Markdown:

```mdx
---
title: "My New Blog Post"
description: "This is a description of my blog post"
date: 2025-01-15
tags: ["Research", "AI"]
draft: false
---

# Main Heading

Your content goes here...

## Subheading

More content...
```

## Frontmatter Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | The title of your blog post |
| `description` | string | Yes | A brief summary (shown in previews and SEO) |
| `date` | date | Yes | Publication date in YYYY-MM-DD format |
| `tags` | array | No | List of tags for categorization |
| `draft` | boolean | No | Set to `true` to hide from production |
| `image` | string | No | URL to a featured image |

## Using MDX Features

Your blog posts support MDX, which means you can use:

### Code Blocks

```python
def hello_world():
    print("Hello, World!")
```

### Lists

- Item 1
- Item 2
- Item 3

### Bold and Italic

**Bold text** and *italic text*

### Links

[Link text](https://example.com)

### Images

```mdx
![Alt text](/path/to/image.jpg)
```

## Managing Posts

### Viewing All Posts

All blog posts are automatically collected from `src/content/blog/`. The system will:

- Display up to 3 posts on the homepage
- Show all posts on the `/blog` page
- Sort by date (newest first)

### Draft Mode

To hide a post from being published:

```yaml
draft: true
```

The post will not appear on the live site but will still be available in development.

### Deleting a Post

Simply delete the `.mdx` file from `src/content/blog/`.

## Example: Complete Blog Post

Here's a complete example:

```mdx
---
title: "Building an AI Model for Marine Species Detection"
description: "How we developed a deep learning model to automatically detect marine species in underwater images."
date: 2025-02-01
tags: ["AI", "Marine Science", "Computer Vision"]
draft: false
---

# Building an AI Model for Marine Species Detection

Monitoring marine species is crucial for conservation efforts. In this post, I'll explain how we built an AI model to detect various marine species in underwater images.

## The Challenge

Underwater photography presents unique challenges:
- Poor visibility
- Variable lighting conditions
- Moving subjects

## Our Approach

We used a combination of:

1. **YOLOv8** for object detection
2. **Data augmentation** to improve robustness
3. **Transfer learning** from pretrained models

## Results

Our model achieved:
- 95% accuracy on test data
- Real-time detection at 30 FPS

## Conclusion

This tool is now being used by marine researchers worldwide.
```

## Tips for Writing Blog Posts

1. **Keep titles concise** - Aim for under 60 characters
2. **Write good descriptions** - These appear in search results and social media previews
3. **Use relevant tags** - Helps with categorization and SEO
4. **Add images** - Makes posts more engaging (optional but recommended)
5. **Set draft to false** - Don't forget to publish!

## Next Steps

- Check your blog at `/blog`
- Verify the post appears on the homepage
- Share your post on social media

## Troubleshooting

### Post not appearing?

1. Check that `draft: false` is set
2. Verify the date is in the correct format (YYYY-MM-DD)
3. Make sure the file is in `src/content/blog/`
4. Rebuild the site: `pnpm build`

### Build errors?

1. Check for syntax errors in frontmatter
2. Verify all required fields are present
3. Check the Astro console for specific error messages
