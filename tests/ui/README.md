# UI Test Automation (Playwright)

## Overview
This directory contains UI end-to-end tests for zakfarm.com, implemented using Playwright and the Page Object Model (POM) for maintainability and scalability.

## Structure
- `pages/` - Page Object classes encapsulating selectors and actions for each page.
- `tests/` - Test specs using Playwright and Page Objects.
- `utils/` - Helpers and test data for use in tests.

## Page Object Model (POM)
- Each page (e.g., Home, Cart, Catalog) has a corresponding class in `pages/`.
- Page Objects expose methods for interacting with the page, hiding selector details from tests.
- Tests import and use these classes for readable, maintainable code.

## Helpers & Test Data
- `utils/helpers.js` - Utility functions (e.g., random email, string generation).
- `utils/testData.js` - Sample product/user data and timeouts for tests.

## Adding New Tests or Pages
- Add new Page Object classes to `pages/`.
- Add new test specs to `tests/`.
- Use helpers and test data as needed.
- Follow existing code style and structure.

## Running Tests

### Prerequisites
- Node.js (version specified in .nvmrc)
- npm packages installed (`npm install`)
- Environment variables configured in `.env`

### Commands
```bash
# Run all UI tests
npm run test:ui

# Run UI tests in headed mode
npm run test:ui -- --headed

# Run a specific test file
npm run test:ui tests/ui/tests/home.spec.js

# Run tests in debug mode
npm run test:ui -- --debug