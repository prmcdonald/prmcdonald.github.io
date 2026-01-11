# GitHub Pages Deployment Guide

This guide explains how to deploy your React personal website to GitHub Pages using GitHub Actions.

## Quick Start

Your repository is now configured with automated deployment! Here's what you need to do:

### Step 1: Configure GitHub Pages Settings

1. Go to your repository on GitHub.com: `https://github.com/prmcdonald/prmcdonald.github.io`
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown
   - This tells GitHub to use the workflow file instead of deploying from a branch

### Step 2: Push Your Code

When you push your code to the `main` or `master` branch, the GitHub Actions workflow will automatically:

1. Check out your code
2. Install Node.js and dependencies
3. Build your React application
4. Deploy the built files to GitHub Pages

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### Step 3: Monitor the Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Click on the workflow run to see detailed logs
4. Once complete (green checkmark), your site is live!

### Step 4: Access Your Website

Your website will be available at:
```
https://prmcdonald.github.io
```

Note: It may take a few minutes for the first deployment to complete and for your site to become available.

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) includes two jobs:

### Build Job
- Runs on Ubuntu latest
- Checks out your code
- Sets up Node.js 18
- Installs dependencies with `npm ci`
- Builds the React app with `npm run build`
- Uploads the build folder as an artifact

### Deploy Job
- Waits for the build job to complete
- Deploys the artifact to GitHub Pages
- Provides the URL where your site is deployed

## Workflow Triggers

The deployment automatically runs when:
- You push to the `main` branch
- You push to the `master` branch
- You manually trigger it from the Actions tab (using workflow_dispatch)

## Manual Trigger

You can manually trigger a deployment without pushing code:

1. Go to the **Actions** tab
2. Click on "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select the branch and click **Run workflow**

## Troubleshooting

### Build Fails

If the build fails:
1. Check the Actions tab for error logs
2. Common issues:
   - Missing dependencies in package.json
   - Build errors in your React code
   - Node version compatibility issues

### Site Not Updating

If your site doesn't update after deployment:
1. Clear your browser cache
2. Wait a few minutes (GitHub Pages can take time to update)
3. Check that the workflow completed successfully in Actions tab

### Pages Not Enabled

If you see a 404 error:
1. Ensure GitHub Pages is enabled in Settings → Pages
2. Verify "Source" is set to "GitHub Actions"
3. Check that the workflow completed successfully

## Advantages of GitHub Actions Deployment

✅ **Automatic**: Deploys on every push to main/master
✅ **No local build**: Build happens in the cloud
✅ **Version control**: Deployment history in Actions tab
✅ **No credentials needed**: Uses GitHub's built-in tokens
✅ **Free**: Included with GitHub for public repositories

## Alternative: Manual Deployment

If you prefer manual deployment from your local machine:

```bash
npm run deploy
```

This uses the `gh-pages` package to deploy from your computer. You'll need to:
1. Change GitHub Pages source to "Deploy from a branch"
2. Select the `gh-pages` branch

However, GitHub Actions is recommended for easier maintenance and automation.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Deploying to GitHub Pages with Actions](https://github.com/actions/deploy-pages)

## Support

If you encounter issues:
1. Check the Actions tab for detailed error logs
2. Review the workflow file at `.github/workflows/deploy.yml`
3. Ensure your package.json scripts work locally (`npm run build`)
