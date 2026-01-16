---
name: file-analysis
description: Analyze files in a codebase to understand structure, find patterns, extract metadata, and generate summaries. Use when exploring unfamiliar codebases, documenting project structure, or when users ask about file contents, organization, or relationships.
license: MIT
metadata:
  author: context-library
  version: "1.0.0"
---

# File Analysis Skill

This skill helps AI agents analyze and understand files in a codebase effectively.

## When to Use

- Exploring unfamiliar codebases or directories
- Understanding project structure and organization
- Finding files by pattern, type, or content
- Extracting metadata from files
- Generating summaries of codebase structure
- Answering questions about file locations, relationships, or contents

## Core Capabilities

### File Discovery
- Search for files by name pattern using glob patterns
- Filter files by extension or type
- Find files in specific directories or subdirectories
- List directory contents with appropriate filtering

### File Reading and Analysis
- Read file contents efficiently
- Analyze file structure (imports, exports, dependencies)
- Extract metadata from frontmatter or headers
- Identify file relationships and dependencies

### Pattern Recognition
- Find files matching specific patterns (e.g., all test files, config files)
- Group related files together
- Identify common file organization patterns

## Best Practices

1. **Start Broad, Then Narrow**: Begin with directory listings to understand structure before diving into specific files
2. **Use Appropriate Tools**: Prefer semantic search tools for finding code patterns, and file search tools for exact matches
3. **Respect File Size**: For very large files, read specific sections or use tools that handle large files efficiently
4. **Consider Context**: Take into account the project's file structure conventions when searching
5. **Document Findings**: When exploring, note important files and their purposes for future reference

## Common Workflows

### Exploring a New Codebase
1. List the root directory to understand top-level structure
2. Identify key directories (src/, components/, config/, etc.)
3. Look for README or documentation files
4. Examine package.json or similar dependency files
5. Explore main entry points and configuration files

### Finding Specific Files
1. Use glob patterns to search by name (e.g., `*.test.ts`, `*config*.json`)
2. Filter results by location if needed
3. Read relevant files to understand their purpose
4. Check related files if dependencies are found

### Analyzing File Structure
1. Read the target file
2. Extract imports/exports to understand dependencies
3. Note key functions, classes, or patterns
4. Reference related files mentioned in the code
5. Document findings for the user

## Examples

### Finding Configuration Files
```
Search for: *.config.*
Common locations: root, config/, .config/
Common formats: .js, .ts, .json, .yml, .yaml
```

### Finding Test Files
```
Pattern: *.test.* or *.spec.*
Typical locations: __tests__/, tests/, or next to source files
```

### Finding Component Files
```
In React/Next.js: Look for .tsx, .jsx files in components/
In Astro: Look for .astro files
Framework conventions vary, check project structure first
```

## Edge Cases to Handle

- **Large Files**: Some files (e.g., minified JS, large JSON dumps) may be too large to read entirely. Consider reading specific sections or using specialized analysis tools.
- **Binary Files**: Image, video, or compiled binary files require different approaches than text files.
- **Hidden Files**: Don't forget files starting with `.` when exploring directory structures.
- **Symlinks**: Be aware that some files may be symlinks pointing to other locations.
- **Git Ignored Files**: Some relevant files may be in `.gitignore` and not visible in standard searches.

## Related Skills

- Code Search: For finding code patterns and implementations
- Documentation Generation: For creating summaries of file structures
- Dependency Analysis: For understanding file relationships
