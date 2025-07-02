# Zakfarm Automation Framework

## Project Description
Automated end-to-end and API testing framework for zakfarm.com using Playwright. The framework covers UI and API scenarios, supports multi-language testing, and follows the Page Object Model for maintainability.

## Prerequisites
- Node.js (see .nvmrc for version)
- npm (comes with Node.js)
- Playwright (installed via npm)

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Configure environment variables in `.env` (see below).

## Environment Variables
- `BASE_URL` - English site URL (e.g., https://zakfarm.com)
- `BASE_URL_RU` - Russian site URL (e.g., https://zakfarm.com/ru)
- `API_TIMEOUT` - Timeout for API/UI waits (default: 30000)
- Add any other required variables as needed.

## Running Tests
- **All UI tests:**
  ```bash
  npm run test:ui
  ```
- **All API tests:**
  ```bash
  npm run test:api
  ```
- **Specific test file:**
  ```bash
  npm run test:ui tests/ui/tests/home.spec.js
  ```
- **Debug mode:**
  ```bash
  npm run test:ui -- --debug
  ```

## Directory Structure
```
zakfarm/
├── .env
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── main.yml
├── .vscode/
│   └── mcp.json
├── tests/
│   ├── ui/
│   │   ├── README.md
│   │   ├── pages/
│   │   │   └── (Page Object files)
│   │   ├── tests/
│   │   │   └── (UI test files)
│   │   └── utils/
│   │       └── (Utility files for UI tests)
│   ├── api/
│   │   ├── README.md
│   │   ├── tests/
│   │   │   └── (API test files)
│   │   └── utils/
│   │       └── (Utility files for API tests)
├── playwright.config.js
├── package.json
└── package-lock.json
