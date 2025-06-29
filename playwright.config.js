// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // Changed to false to avoid resource contention
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Reduced to 1 to avoid resource contention
  reporter: 'html',
  
  // Increased timeouts
  timeout: 120000, // Increased to 120 seconds
  expect: {
    timeout: 20000,  // Increased expect timeout
  },
  
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Browser configuration
    actionTimeout: 30000,     // Increased action timeout
    navigationTimeout: 45000,  // Increased navigation timeout
    
    // Additional options for stability
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      args: [
        '--disable-dev-shm-usage', // Helps with memory issues
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process' // Helps with frame handling
      ],
      slowMo: process.env.CI ? 0 : 100, // Increased slowdown for stability
    },

    // Additional settings for better stability
    bypassCSP: true, // Bypass Content Security Policy
    ignoreHTTPSErrors: true,
    maxConcurrentPages: 1, // Limit concurrent pages
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        contextOptions: {
          reducedMotion: 'reduce',
        },
        // Additional browser settings
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
    },
  ],
});