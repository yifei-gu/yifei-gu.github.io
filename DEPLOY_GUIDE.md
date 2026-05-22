# Hosting on GitHub Pages

This guide explains how to host your personal website on GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Your website code pushed to a GitHub repository

## Option 1: Using GitHub Actions (Recommended)

This is the recommended method as it automatically builds and deploys your site whenever you push changes.

### Step 1: Create GitHub Workflow

1. Create a `.github/workflows` folder in your project root
2. Create a file named `deploy.yml` inside it

```bash
mkdir -p .github/workflows
```

3. Add the following content to `deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2: Configure Repository Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**

### Step 3: Push Changes

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

### Step 4: Monitor Deployment

1. Go to your repository's **Actions** tab
2. You should see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Your site will be available at:
   - **Project site** (repo named e.g. `yfg_landing`): `https://your-username.github.io/yfg_landing/`
   - **User site** (repo named `your-username.github.io`): `https://your-username.github.io/`

### Astro base URL (already configured)

`astro.config.mjs` sets `base` automatically in CI from `GITHUB_REPOSITORY`:

- Repo `username/yfg_landing` → `base: '/yfg_landing'`
- Repo `username/username.github.io` → `base: '/'`

To override locally or in CI:

```bash
ASTRO_BASE=/my-repo pnpm build
ASTRO_SITE=https://your-username.github.io/my-repo pnpm build
```

After changing repo name or using a custom domain, update `site` in `astro.config.mjs` and the `og:url` meta tag in `src/layouts/Layout.astro`.

---

## Option 2: Manual Deployment

### Step 1: Build the Site

```bash
pnpm build
```

This creates a `dist/` folder with your compiled website.

### Step 2: Switch to GitHub Pages Branch

```bash
# Create or switch to the gh-pages branch
git checkout -B gh-pages
```

### Step 3: Remove dist from .gitignore (if needed)

Make sure the `dist` folder is not being ignored by Git. Check your `.gitignore` file.

### Step 4: Commit and Push

```bash
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Step 5: Configure GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**
   - Branch: Select **gh-pages** and folder: **/(root)**
4. Click **Save**

---

## Configuring Your Domain

### Using Custom Domain

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Update your DNS records at your domain provider:
   - Add a CNAME record pointing to `your-username.github.io`

### Important: Update Site URL

If using a custom domain or repository name, update the site URL in your code:

1. Open `src/layouts/Layout.astro`
2. Update the `og:url` meta tag:

```astro
<meta property="og:url" content="https://your-domain.com" />
```

---

## Updating Your Site

### Method 1: GitHub Actions (Recommended)

Simply push your changes:

```bash
git add .
git commit -m "Update website content"
git push origin main
```

The GitHub Action will automatically rebuild and deploy.

### Method 2: Manual

Rebuild and push to gh-pages:

```bash
pnpm build
git checkout gh-pages
git add dist/ -f
git commit -m "Deploy update"
git push origin gh-pages
git checkout main
```

---

## Troubleshooting

### Page Not Found (404)

- Ensure the repository name matches: `username.github.io`
- Check that `gh-pages` branch exists
- Verify GitHub Pages is enabled in settings

### Broken Links / 404 assets

- Confirm `base` in `astro.config.mjs` matches your GitHub Pages URL path
- For a project site, the URL must include `/repository-name/`
- Astro rewrites root-absolute paths (`/software/...`) when `base` is set
- Override with `ASTRO_BASE` if the auto-detected path is wrong

### Build Failures

- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### CSS/JS Not Loading

- Check browser console for 404 errors
- Verify the `dist/` folder contains all assets

---

## Best Practices

1. **Use GitHub Actions** - Automatic deployments are easier
2. **Keep node_modules in .gitignore** - Don't commit dependencies
3. **Use a consistent branch strategy** - Main for development, auto-deploy
4. **Test locally first** - Use `pnpm preview` before pushing

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

---

## Need Help?

- [Astro GitHub Pages Guide](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
