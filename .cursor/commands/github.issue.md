---
description: Create a GitHub issue from a natural language description using repository templates.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after `/github.issue` in the triggering message **is** the issue description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

Given that issue description, do this:

1. **Repository Context Discovery**:
   a. Get repository information:
      ```bash
      git remote get-url origin
      ```
   b. Parse owner and repo name from the URL
   c. Discover available issue templates in `.github/ISSUE_TEMPLATE/`:
      - Look for `*.yml` files (YAML issue forms)
      - Look for `*.md` files (Markdown templates)
      - Parse template metadata (name, description, labels, body structure)

2. **Codebase Context Gathering**:
   Gather relevant codebase context to inform issue creation and template population:
   
   a. **Extract Key Entities from Description**:
      - Identify mentioned files, components, functions, features, or systems
      - Extract technical terms, API names, module names, or architectural components
      - Identify user-facing features or UI elements mentioned
   
   b. **Search for Related Code** (use `codebase_search` or `grep`):
      - If specific files/components mentioned: Search for those files and their usage
      - If feature/functionality mentioned: Semantic search for related implementations
      - If bug/error mentioned: Search for error handling, related code paths, or error messages
      - If API/endpoint mentioned: Search for API definitions, routes, or handlers
      - Read relevant source files to understand current implementation patterns
   
   c. **Check Recent Changes** (if applicable):
      ```bash
      # Check recent commits (last 20) for related changes
      git log --oneline --all -20
      
      # If specific files mentioned, check their recent history
      git log --oneline --all -10 -- <file-paths>
      ```
      - Look for recent commits that might be related to the issue
      - Check if related files were recently modified
      - Note any recent refactoring or feature additions that might be relevant
   
   d. **Search for Related Issues** (via GitHub API/MCP):
      - Search existing issues for similar or related topics
      - Check for duplicate or related bug reports
      - Look for feature requests that might conflict or complement this issue
      - Use search queries based on keywords from the description
   
   e. **Understand Architecture/Patterns** (for feature requests):
      - If adding a feature, understand current architectural patterns
      - Check for similar features to understand implementation approach
      - Review relevant configuration files, schemas, or type definitions
      - Understand data models or API structures if relevant
   
   f. **Gather Technical Details** (for bug reports):
      - If error/bug mentioned: Search for error messages, exception handling
      - Check related configuration files or environment setup
      - Review test files for expected behavior
      - Look at related dependencies or integrations
   
   **Context Usage Strategy**:
   - Use gathered context to inform template field population
   - Reference specific files, commits, or related issues in the issue body when relevant
   - Use context to ask more informed clarifying questions
   - Include relevant code snippets or references in issue description if helpful
   - Note conflicting patterns or existing implementations in the issue
   - **DO NOT** include all context verbatim - summarize key findings relevant to the issue

3. **Template Selection**:
   a. Analyze the issue description to determine the appropriate template:
      - Bug-related keywords: "bug", "error", "broken", "crash", "fails", "issue", "problem", "not working" → Bug Report template
      - Feature-related keywords: "feature", "add", "enhancement", "improve", "suggest", "request", "new" → Feature Request template
      - Default to Feature Request if unclear
   b. If multiple templates match, prefer the most specific match based on keywords
   c. Load the selected template and parse its structure

4. **Template Field Population**:
   For each template field, extract information from the user description:

   **For required fields:**
   - Make informed guesses based on the description
   - Only mark with `[NEEDS CLARIFICATION: specific question]` if:
     - The information is critical and cannot be reasonably inferred
     - Multiple reasonable interpretations exist with different implications
     - No reasonable default exists
   - **LIMIT: Maximum 5 [NEEDS CLARIFICATION] markers total**
   - Prioritize clarifications by impact: severity/priority > technical details > optional metadata

   **For optional fields:**
   - Infer from description when possible
   - Leave empty if not relevant or inferrable
   - Never ask about optional fields unless critical to issue understanding

   **Field extraction strategies:**
   - **Title**: Extract the core issue/feature statement, make it concise (50-72 chars ideal)
   - **Description/Problem**: Use the full user description, expand if needed for clarity
   - **Expected/Actual Behavior**: Extract from bug descriptions, infer if not explicit
   - **Steps to Reproduce**: Extract numbered steps if present, infer sequence otherwise
   - **Severity/Priority**: Infer from urgency indicators ("critical", "urgent", "important") or default to "Medium"
   - **Browser/OS**: Extract from description if mentioned, default to "N/A" if not applicable
   - **Version**: Extract version numbers if mentioned, leave empty if not
   - **Screenshots/Logs**: Mention in description if user references them, otherwise leave empty

5. **Clarification Handling** (only if needed):
   If [NEEDS CLARIFICATION] markers remain:
   a. Extract all markers from the populated template (max 5)
   b. For each clarification needed, present options in this format:

      ```markdown
      ## Question [N]: [Topic]
      
      **Context**: [Quote relevant template field/question]
      
      **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]
      
      **Suggested Answers**:
      
      | Option | Answer | Implications |
      |--------|--------|--------------|
      | A      | [First suggested answer] | [What this means] |
      | B      | [Second suggested answer] | [What this means] |
      | C      | [Default/Standard] | [What this means] |
      | Custom | Provide your own answer | [Explain how to provide custom input] |
      
      **Your choice**: _[Wait for user response]_
      ```

   c. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted:
      - Use consistent spacing with pipes aligned
      - Each cell should have spaces around content: `| Content |` not `|Content|`
      - Header separator must have at least 3 dashes: `|--------|`
   d. Number questions sequentially (Q1, Q2, Q3, Q4, Q5 - max 5 total)
   e. Present all questions together before waiting for responses
   f. Wait for user to respond with their choices (e.g., "Q1: A, Q2: Custom - [details], Q3: B, Q4: C, Q5: A")
   g. Update the template by replacing each [NEEDS CLARIFICATION] marker with the user's answer

6. **Issue Preview**:
   Before creation, display a formatted preview:

   ```markdown
   ## 📝 Issue Preview
   
   **Repository:** owner/repo
   **Template:** [Template Name]
   **Title:** [Issue title]
   **Labels:** [comma-separated labels]
   
   ---
   
   [Full formatted issue body with all fields populated]
   
   ---
   ```

7. **Issue Creation**:
   a. Use GitHub MCP tools (preferred) to create the issue:
      - `mcp_context-library-github_create_issue`
      - Pass owner, repo, title, body, labels, assignees from template
   
   b. If MCP not available, use GitHub CLI:
      ```bash
      gh issue create --repo owner/repo --title "Title" --body "Body" --label "label1,label2"
      ```
   
   c. Handle any creation errors gracefully with clear messages

8. **Output**:
   After successful creation, display:
   ```
   ✅ Issue created successfully!
   🔗 https://github.com/owner/repo/issues/[issue-number]
   ```

## General Guidelines

### For AI Generation

When creating an issue from a user prompt:

1. **Make informed guesses**: Use context, common patterns, and reasonable defaults
2. **Document assumptions**: If you infer information, note it in the issue body when relevant
3. **Limit clarifications**: Maximum 5 [NEEDS CLARIFICATION] markers - use only for:
   - Critical information that affects issue triage or resolution
   - Severity/priority when urgent action might be required
   - Steps to reproduce when the bug cannot be understood without them
4. **Think like a maintainer**: Every unclear required field should either be inferred or clarified
5. **Common defaults** (don't ask about these):
   - Severity: Medium (if not urgent/critical mentioned)
   - Browser/OS: N/A (if web/app bug not specified)
   - Version: Current/latest (if not specified)
   - Priority: Based on urgency language or default to Medium/High

### Template Field Mapping

**Bug Report Template Fields:**
- `title`: Concise bug description (from user input)
- `description`: Full bug description (from user input)
- `expected`: What should happen (infer from description)
- `actual`: What actually happens (extract or infer)
- `steps`: Step-by-step reproduction (extract numbered steps or infer sequence)
- `severity`: Infer from urgency keywords or default to "🟡 Medium"
- `version`: Extract version number if mentioned
- `browser`: Extract if mentioned, default to "N/A" if not web-related
- `os`: Extract if mentioned, default to detected system or "N/A"
- `logs`: Reference if user mentions logs/errors
- `screenshots`: Mention if user references visual evidence
- `checklist`: Default to checked for standard items

**Feature Request Template Fields:**
- `problem`: Problem statement (from user input, may need reframing)
- `solution`: Proposed solution (from user input)
- `alternatives`: Extract if mentioned, otherwise infer or leave empty
- `priority`: Infer from urgency keywords or default to "👍 Medium"
- `user_type`: Default to "Individual Developer" or infer from context
- `use_case`: Extract from description or infer scenario
- `additional`: Any extra context from description
- `contribution`: Leave unchecked unless user offers help

### Examples of Reasonable Inferences

- "The login button doesn't work" → Bug Report, severity Medium, steps inferred
- "Add dark mode support" → Feature Request, priority Medium, problem/solution inferred
- "Critical: app crashes on startup" → Bug Report, severity Critical, steps needed
- "Would be nice to have export to PDF" → Feature Request, priority Low
- "Error 500 when submitting form" → Bug Report, severity High, technical details inferred

## Requirements

- Git repository with GitHub remote
- GitHub MCP server configured OR GitHub CLI (`gh`) authenticated
- Read access to `.github/ISSUE_TEMPLATE/` directory

## Error Handling

- **No description provided**: Error "No issue description provided"
- **No templates found**: Error "No issue templates found in .github/ISSUE_TEMPLATE/"
- **Template parse error**: Error with specific template file issue
- **Repository not found**: Error "Could not determine repository from git remote"
- **Issue creation failed**: Display error message and suggest manual creation
