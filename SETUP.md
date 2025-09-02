# Setup Guide for Shorts Blocker

This guide will help you set up your Shorts Blocker project on GitHub with all the professional open source infrastructure.

## 🚀 Quick Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `dm-shorts-blocker`
3. Make it public
4. Don't initialize with README (we already have one)

### 2. Push Your Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial commit - YouTube Shorts Blocker extension"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/dm-shorts-blocker.git

# Push to main branch
git push -u origin main
```

### 3. Configure Repository Settings

#### Repository Information
- **Description**: "A browser extension that blocks YouTube Shorts to help you stay focused and productive"
- **Website**: `https://YOUR_USERNAME.github.io/dm-shorts-blocker`
- **Topics**: Add these topics:
  - `browser-extension`
  - `youtube`
  - `productivity`
  - `focus`
  - `shorts-blocker`
  - `chrome-extension`
  - `firefox-addon`
  - `edge-extension`
  - `javascript`
  - `dom-manipulation`

#### Repository Features
- ✅ Enable Issues
- ✅ Enable Projects
- ✅ Enable Wiki (optional)
- ✅ Enable Discussions
- ✅ Enable Sponsorships

### 4. Configure GitHub Pages

1. Go to **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (will be created automatically)
4. **Folder**: `/ (root)`
5. Click **Save**

### 5. Set Up Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### 6. Configure GitHub Actions

#### Enable Actions
1. Go to **Settings** → **Actions** → **General**
2. Select **Allow all actions and reusable workflows**
3. Click **Save**

#### Set Up Secrets (Optional)
If you want to use notifications and external services:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `DISCORD_WEBHOOK` - Discord webhook URL for notifications
   - `MAIL_HOST` - SMTP server for email notifications
   - `MAIL_PORT` - SMTP port
   - `MAIL_USERNAME` - SMTP username
   - `MAIL_PASSWORD` - SMTP password
   - `MAIL_TO` - Email address to send notifications to
   - `MAIL_FROM` - Email address to send notifications from

### 7. Update Configuration Files

#### Update URLs and Usernames
Replace `yourusername` with your actual GitHub username in these files (✅ **ВЫПОЛНЕНО**):

- `.github/FUNDING.yml`
- `.github/dependabot.yml`
- `.github/CODEOWNERS`
- `.github/workflows/*.yml` (in various places)
- `docs/_config.yml`
- `SECURITY.md`

#### Update Contact Information
- Update email addresses in `SECURITY.md`
- Update maintainer information in various files

### 8. Create First Release

1. Go to **Releases**
2. Click **Create a new release**
3. **Tag version**: `v1.0.0`
4. **Release title**: `Release v1.0.0`
5. **Description**: Use the template from `.github/release-template.md`
6. Click **Publish release**

### 9. Set Up Project Board

1. Go to **Projects**
2. Create new project: "YouTube Shorts Blocker"
3. Use **Board** template
4. Add columns:
   - 📋 Backlog
   - 🔄 In Progress
   - 👀 Review
   - ✅ Done

### 10. Configure Issue Templates

The issue templates are already set up in `.github/ISSUE_TEMPLATE/`. They will be automatically available when you create issues.

## 🔧 Advanced Configuration

### GitHub Apps and Integrations

#### Dependabot
- Already configured in `.github/dependabot.yml`
- Will automatically create PRs for dependency updates

#### CodeQL
- Already configured in security workflows
- Provides automated security analysis

#### Stale Bot
- Already configured in `.github/workflows/stale.yml`
- Automatically closes inactive issues and PRs

### Community Features

#### Discussions
- Enable Discussions in repository settings
- Create categories:
  - General
  - Q&A
  - Show and tell
  - Ideas

#### Wiki
- Enable Wiki in repository settings
- Add detailed documentation

#### Sponsorships
- Enable Sponsorships in repository settings
- Set up funding platforms

## 📋 Post-Setup Checklist

- [ ] Repository created and configured
- [ ] Code pushed to GitHub
- [ ] Repository settings configured
- [ ] GitHub Pages enabled
- [ ] Branch protection rules set
- [ ] GitHub Actions enabled
- [ ] Secrets configured (if needed)
- [ ] URLs and usernames updated
- [ ] First release created
- [ ] Project board set up
- [ ] Issue templates working
- [ ] Discussions enabled
- [ ] Wiki enabled (optional)
- [ ] Sponsorships enabled (optional)

## 🎯 Next Steps

1. **Test the Workflows**: Push a small change to trigger CI/CD
2. **Create Issues**: Add some initial issues for features/bugs
3. **Set Up Monitoring**: Check that all workflows are running correctly
4. **Community Building**: Start engaging with potential contributors
5. **Documentation**: Keep documentation up to date
6. **Releases**: Plan and create regular releases

## 🆘 Troubleshooting

### Common Issues

#### Workflows Not Running
- Check that Actions are enabled in repository settings
- Verify the workflow files are in `.github/workflows/`
- Check for syntax errors in YAML files

#### GitHub Pages Not Working
- Verify the gh-pages branch exists
- Check that Pages are enabled in settings
- Wait a few minutes for deployment

#### Branch Protection Issues
- Make sure you have admin access to the repository
- Check that the branch name matches exactly

#### Notification Issues
- Verify webhook URLs are correct
- Check that secrets are properly configured
- Test webhook endpoints manually

### Getting Help

- Check GitHub's documentation
- Look at similar open source projects
- Ask in GitHub Community discussions
- Create an issue in your repository

## 🎉 Congratulations!

Your YouTube Shorts Blocker project is now professionally set up as an open source project with:

- ✅ Professional documentation
- ✅ Automated workflows
- ✅ Security scanning
- ✅ Community guidelines
- ✅ Issue templates
- ✅ Release management
- ✅ Analytics and reporting
- ✅ Monitoring and maintenance

You're ready to build a thriving open source community! 🚀
