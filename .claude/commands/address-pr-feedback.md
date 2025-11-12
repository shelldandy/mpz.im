---
description: Address PR review feedback by comparing specs against recent commits and resolving review comments
---

You are tasked with addressing PR review feedback systematically. Follow these steps:

## 1. Parse Parameters

Accept the following parameters from the command invocation:

- `--spec <file>` or `-s <file>`: Path to specs file (relative to specs.local/ or absolute). If not provided, use the most recent .md file in specs.local/
- `--commits <number>` or `-c <number>`: Number of recent commits to analyze (default: 1)

Example usage:

- `/address-pr-feedback` (uses defaults)
- `/address-pr-feedback --spec dark-mode-specs.md --commits 3`
- `/address-pr-feedback -s brutal-styling.md -c 2`

## 2. Load Specifications

- If a spec file is provided, read it from `specs.local/<filename>` (or use absolute path if provided)
- If no spec file is provided, find the most recently modified .md file in specs.local/ and use that
- Display which spec file you're using for reference

## 3. Analyze Recent Commits

- Use `git log -<number> --oneline` to show the commits being analyzed
- Use `git diff HEAD~<number>..HEAD` to see all changes in the specified commit range
- Summarize the key changes made

## 4. Fetch PR Review Comments via GraphQL

Use GitHub's GraphQL API to get review threads with their resolution status:

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          resolvedBy {
            login
          }
          comments(first: 10) {
            nodes {
              id
              path
              body
              line
              originalLine
              diffHunk
              author {
                login
              }
              createdAt
            }
          }
        }
      }
    }
  }
}
' -F owner=<owner> -F repo=<repo> -F number=<pr_number>
```

Extract and parse:

- Thread IDs (for resolution)
- Comment details (file, line, body)
- Current resolution status
- Filter to only unresolved threads

## 5. Compare Against Specifications

- Cross-reference the specs file with:
  - The PR review comments
  - The actual implementation in the recent commits
- Identify which comments have been addressed by:
  - Checking if the file/line mentioned has been modified in the commit range
  - Verifying the change aligns with both the comment and the specs
  - Reading the current state of commented code

## 6. Resolve Addressed Comments

For each review thread that HAS been addressed in the recent commits:

### a. Verify the fix

- Read the relevant file section
- Confirm it matches what the reviewer requested
- Ensure it aligns with the specs

### b. Post a general review comment (RECOMMENDED)

The most reliable way to document resolutions is to post a single general review comment summarizing all fixes:

```bash
gh pr review <pr_number> --comment --body "## ✅ Review Feedback Addressed

All review comments have been addressed in commit <hash>:

### 1. [File:Line] Issue Title
Fixed: <brief explanation>

### 2. [File:Line] Issue Title
Enhanced: <brief explanation>

All changes align with specifications."
```

**Why this approach works better:**

- Single comment documenting all resolutions
- No issues with comment ID formats or REST API endpoints
- Provides clear documentation of what was addressed
- Easier to review at a glance

### c. Resolve threads using GraphQL

After posting the review comment, resolve each thread individually using the `resolveReviewThread` mutation:

```bash
gh api graphql -f query='
mutation($threadId: ID!) {
  resolveReviewThread(input: {threadId: $threadId}) {
    thread {
      id
      isResolved
    }
  }
}
' -F threadId=<thread_id>
```

**Important:** Use the thread ID from the GraphQL query (format: `PRRT_xxxxx`), not the comment ID.

### d. Track resolution

Keep count of:

- Comments replied to
- Threads resolved
- Any errors encountered

## 7. Identify Unaddressed Comments

After going through all comments:

- Create a list of review threads that are NOT yet addressed
- These are threads where:
  - The file/line hasn't been modified in the commit range
  - The change doesn't align with the comment
  - The implementation differs from what was requested
  - Additional work is needed

## 8. Handle Outstanding Comments

**If there are unaddressed comments remaining:**

Run the command: `/pr-feedback-plan`

This will create a comprehensive plan to address the remaining feedback.

**If all comments are addressed:**

Celebrate! All feedback has been incorporated. 🎉

## 9. Summary Report

Provide a clear summary:

```markdown
## PR Feedback Resolution Summary

### Specs Used

- File: specs.local/<filename>
- Last modified: <timestamp>

### Commits Analyzed

<commit range with messages>

### Review Comments Status

- ✅ Addressed and resolved: X threads
- 💬 Commented (unable to resolve via API): Y threads
- ⏳ Unaddressed: Z threads

### Resolved Threads

1. [File:Line] Thread: <thread_id>
   - Comment: <summary>
   - Resolution: <what was changed in commit>
   - Status: ✅ Resolved

### Unaddressed Threads (if any)

1. [File:Line] <summary of what needs to be done>
2. [File:Line] <summary of what needs to be done>

### Next Steps

[If unaddressed comments exist]:
Running /pr-feedback-plan to create action plan...

[If all resolved]:
All review comments have been addressed and resolved! ✅
```

## Important Guidelines

- **Only resolve truly addressed items**: Don't mark threads as resolved unless the change genuinely addresses the feedback
- **Be specific in responses**: When commenting, clearly state what was changed and reference the commit hash
- **Use both comment + resolve**: Always comment first explaining the resolution, then resolve the thread
- **Handle errors gracefully**: If GraphQL resolution fails, at minimum ensure the comment was posted
- **Maintain consistency**: Ensure fixes align with the specs
- **Document accurately**: If you're unsure whether something is addressed, list it as unaddressed
- **Preserve intent**: Make sure resolutions respect both reviewer intent and spec requirements
- **Check resolution status first**: Don't try to resolve already-resolved threads

## Technical Notes

### Thread Resolution API Details

- **Thread IDs vs Comment IDs:** Review thread IDs from GraphQL are different from comment IDs
  - Thread ID format: `PRRT_xxxxx` (used for resolving threads)
  - Comment ID format: `PRRC_xxxxx` (individual comments within a thread)
- **GraphQL mutation is the only reliable way to resolve threads:** The REST API endpoint for replying to individual comments (`repos/{owner}/{repo}/pulls/comments/{comment_id}/replies`) may not work consistently
- **Recommended workflow:**
  1. Fetch threads via GraphQL query (get thread IDs and resolution status)
  2. Verify fixes by reading the actual files
  3. Post a single general review comment via `gh pr review` summarizing all fixes
  4. Resolve each thread individually via GraphQL mutation using thread IDs
- **Always check `isResolved` before attempting to resolve:** Don't try to resolve already-resolved threads
- **Error handling:** If thread resolution fails, ensure at minimum the review comment was posted successfully

Start by acknowledging the command parameters and then proceed systematically through each step.
