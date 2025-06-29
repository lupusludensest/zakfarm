
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
npm run test:ui [home.spec.js](http://_vscodecontentref_/1)

# Run tests in debug mode
npm run test:ui -- --debug