# GitHub Account Switching Setup (PAT-Based)

This setup provides global commands to easily switch between personal and work GitHub accounts using Personal Access Tokens (PATs).

## Available Commands

- `gh-personal` - Switch to personal GitHub account
- `gh-work` - Switch to work GitHub account  
- `gh-status` - Show current account status

## Setup Instructions

### 1. Generate Personal Access Tokens

For each GitHub account (personal and work):

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Personal Account Token", "Work Account Token")
4. Select the necessary scopes (typically `repo`, `workflow`, `write:packages`, `delete:packages`)
5. Copy the generated token (you won't see it again!)

### 2. Configure Your Account Details

Edit the configuration file with your actual account details:

```bash
nano ~/.github-accounts
```

Update the following variables:
- `PERSONAL_NAME` - Your personal name
- `PERSONAL_EMAIL` - Your personal email
- `PERSONAL_TOKEN` - Your personal GitHub token
- `WORK_NAME` - Your work name
- `WORK_EMAIL` - Your work email
- `WORK_TOKEN` - Your work GitHub token

### 3. How PAT Authentication Works

The scripts will:
- Set your Git global user name and email
- Configure Git to use HTTPS with your Personal Access Token
- Store the token securely in `~/.git-credentials`
- Set the appropriate token for GitHub CLI if installed

## Usage Examples

```bash
# Check current status
gh-status

# Switch to personal account
gh-personal

# Switch to work account
gh-work

# Check status again
gh-status
```

## How It Works

The scripts modify your global Git configuration:
- `git config --global user.name`
- `git config --global user.email`
- `git config --global credential.helper store`

They configure Git to use HTTPS authentication with your Personal Access Tokens:
- Store tokens securely in `~/.git-credentials`
- Set appropriate tokens for GitHub CLI
- Automatically handle authentication for all Git operations

## Files Created

- `~/bin/github-helper` - Main helper script
- `~/bin/github-personal` - Personal account switcher
- `~/bin/github-work` - Work account switcher
- `~/bin/github-status` - Status checker
- `~/.github-accounts` - Configuration file
- `~/.git-credentials` - Stored tokens (created automatically)
- `~/.zshrc` - Updated with aliases and PATH

## Security Notes

- Keep your GitHub tokens secure
- Never commit `~/.github-accounts` or `~/.git-credentials` to version control
- The configuration files are in your home directory for security
- Tokens are stored with restricted permissions (600) 