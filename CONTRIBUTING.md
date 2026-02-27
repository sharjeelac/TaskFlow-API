# Contributing to TaskFlow API

Thank you for your interest in contributing to TaskFlow API! We appreciate your help in making this project better. This document provides guidelines for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues professionally

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/taskflow-api.git
   cd taskflow-api
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/taskflow-api.git
   ```

4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with configuration (copy from `.env.example`)

3. Start development server:
   ```bash
   npm run dev
   ```

## Making Changes

### Code Style
- Use meaningful variable and function names
- Follow Express.js conventions
- Use async/await instead of callbacks
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
Write clear, descriptive commit messages:
```
feat: Add user profile endpoints
fix: Resolve authentication token expiry issue
docs: Update installation instructions
style: Format code according to prettier
refactor: Extract validation logic
test: Add tests for task creation
```

**Format**: `<type>: <description>`

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues (#123)
   - Screenshots/examples if applicable
   - List of changes made

4. **Respond to reviews** promptly and professionally

## Testing

Before submitting a PR:
- Test your changes thoroughly
- Ensure the API works correctly
- Test edge cases and error scenarios
- Check for console errors

## Documentation

- Update README.md if adding new features
- Add comments to complex functions
- Update API endpoints documentation
- Include examples for new features

## Reporting Issues

When reporting bugs:
1. **Check existing issues** first
2. **Describe the problem** clearly
3. **Include steps to reproduce**
4. **Provide error messages** or logs
5. **Mention your environment** (Node version, OS, etc.)

## Feature Requests

When suggesting features:
1. **Explain the use case**
2. **Describe expected behavior**
3. **Provide examples** if possible
4. **Discuss implementation** approach

## Areas for Contribution

### Code
- Bug fixes
- New features
- Performance improvements
- Code refactoring

### Documentation
- Writing tutorials
- Improving README
- API documentation
- Code examples

### Testing
- Writing unit tests
- Integration tests
- Bug reports
- Testing new features

### Design
- UI/UX improvements
- Architecture enhancements
- Pattern optimization

## Questions?

- Check existing documentation
- Read through past issues and PRs
- Ask in discussions or issues
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

**Thank you for contributing to TaskFlow API! 🎉**
