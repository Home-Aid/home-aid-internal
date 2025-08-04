# Personal Access Token (PAT) Setup Guide

## Step-by-Step Instructions

### 1. Generate Personal Account Token

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name: `Personal Account Token`
4. Set expiration: Choose an appropriate duration (e.g., 90 days)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `write:packages` (Upload packages to GitHub Package Registry)
   - ✅ `delete:packages` (Delete packages from GitHub Package Registry)
   - ✅ `gist` (Create gists)
   - ✅ `notifications` (Access notifications)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### 2. Generate Work Account Token

1. Log into your work GitHub account
2. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
3. Click "Generate new token (classic)"
4. Give it a descriptive name: `Work Account Token`
5. Set expiration: Choose an appropriate duration (e.g., 90 days)
6. Select the same scopes as above
7. Click "Generate token"
8. **Copy the token immediately** (you won't see it again!)

### 3. Update Configuration

Edit your configuration file:

```bash
nano ~/.github-accounts
```

Replace the placeholder values:

```bash
# Personal Account Configuration
PERSONAL_NAME="Your Actual Personal Name"
PERSONAL_EMAIL="your.actual.personal.email@example.com"
PERSONAL_TOKEN="ghp_your_actual_personal_token_here"

# Work Account Configuration  
WORK_NAME="Your Actual Work Name"
WORK_EMAIL="your.actual.work.email@company.com"
WORK_TOKEN="ghp_your_actual_work_token_here"
```

### 4. Test the Setup

```bash
# Check current status
gh-status

# Switch to personal account
gh-personal

# Switch to work account
gh-work

# Test Git operations
git clone https://github.com/your-username/test-repo.git
```

## Token Security Best Practices

- **Never share your tokens** - they provide full access to your account
- **Use descriptive names** - helps identify token purpose
- **Set appropriate expiration** - shorter is more secure
- **Limit scopes** - only grant necessary permissions
- **Rotate regularly** - regenerate tokens periodically
- **Store securely** - keep configuration file private

## Troubleshooting

### Token Not Working
- Check if token has correct scopes
- Verify token hasn't expired
- Ensure token is copied correctly (no extra spaces)

### Authentication Issues
- Run `gh-status` to check current configuration
- Try switching accounts: `gh-personal` or `gh-work`
- Check if `~/.git-credentials` exists and has correct format

### GitHub CLI Issues
- Run `gh auth status` to check CLI authentication
- Use `gh auth login` to re-authenticate if needed 