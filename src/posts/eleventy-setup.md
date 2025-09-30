---
title: "Setting Up Eleventy for a Personal Blog"
date: 2025-09-29
description: "A guide to building a fast, simple blog with Eleventy static site generator."
tags: ["eleventy", "jamstack", "code"]
layout: layouts/post.njk
---

Eleventy (11ty) has become my go-to tool for building static sites. It's fast, flexible, and stays out of your way.

## Why Eleventy?

After trying various static site generators, I keep coming back to Eleventy for a few reasons:

- **Zero JavaScript by default**
- **Flexible templating**
- **Fast builds** 


## Basic Setup

Installation is straightforward:

```bash
npm init -y
npm install --save-dev @11ty/eleventy
```

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  }
}
```

## Project Structure

I organize my Eleventy projects like this:

```
my-site/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   └── partials/
│   ├── posts/
│   ├── css/
│   └── index.njk
├── .eleventy.js
└── package.json
```

## Configuration

The `.eleventy.js` file is where you configure everything:

```javascript
module.exports = function(eleventyConfig) {
  // Pass through CSS
  eleventyConfig.addPassthroughCopy("src/css");

  // Create collections
  eleventyConfig.addCollection("posts", function(api) {
    return api.getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
```

## Writing Content

Posts are just Markdown files with front matter:

```markdown
---
title: "My Post Title"
date: 2025-09-27
tags: ["web", "code"]
---

Your content here...
```

## Templates

I use Nunjucks for templates. Here's a simple post layout:

```html
---
layout: layouts/base.njk
---

<article>
  <h1>{{ title }}</h1>
  <time>{{ date | readableDate }}</time>
  {{ content | safe }}
</article>
```

## Deployment

Since Eleventy outputs static files, you can deploy anywhere:

- Vercel
- Netlify
- Any static host

Just point your host to the `_site` directory and you're done.

## Conclusion

Eleventy strikes the perfect balance between simplicity and power. It's fast, flexible, and lets you focus on content rather than configuration.