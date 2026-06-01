# Git Commit Instructions (Conventional Commits)

Use Conventional Commits for every commit message. See
[conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/) for spec.

## Required Format

### Single-line

```
<type>[optional scope]: <description>
```

### Multi-line (for multiple changes)

Each line must follow the exact format:

```
feat (): <subject>
fix (): <subject>
docs (): <subject>
```

## Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, no code change
- `refactor`: Code change, neither fix nor feature
- `perf`: Performance improvement
- `test`: Tests
- `build`: Build system/dependencies
- `ci`: CI changes
- `chore`: Maintenance
- `revert`: Revert commit

## Scope (inside `()`)

- Optional but recommended
- Short, lowercase: `ui`, `api`, `auth`, `db`
- Example: `feat (ui): add button`

## Rules for `<subject>`

- Imperative mood: "add", "fix", "remove"
- Capitalize first letter
- Max 50 chars
- No period at end

## Breaking Changes

Add `!` after type, or footer:

```
feat! (api): new API version

BREAKING CHANGE: incompatible params
```

## Examples

**Single-line:**

```
fix (api): handle null user
```

**Multi-line:**

```
feat (ui): add login form
refactor (auth): extract validator
chore (deps): update lodash
```

## Common Mistakes

- No scope when needed
- Non-imperative: "added X" -> "add X"
- Invalid types like "update"
