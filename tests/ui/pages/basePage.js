// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\pages\basePage.js

const { expect } = require('@playwright/test');
require('dotenv').config();

class BasePage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        // Add fallback for BASE_URL
        this.url = process.env.BASE_URL || 'https://zakfarm.com';

        // Common selectors that might be used across pages
        this.header = '.header';
        this.footer = '.footer';
        this.logo = '.logo';
        this.navigationMenu = '.nav-menu';
    }

    /**
     * Navigate to base URL
     */
    async goto() {
        if (!this.url) {
            throw new Error('BASE_URL is not defined in environment variables');
        }
        await this.page.goto(this.url);
    }

    // ... rest of the methods remain the same ...
}

module.exports = BasePage;