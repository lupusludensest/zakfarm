// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\tests\home.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const path = require('path');

test.describe('Home Page Tests', () => {
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');

    test.beforeEach(async ({ page }) => {
        process.env.SKIP_SCREENSHOTS = 'true';
    });

    test('Should handle product details correctly in English', async ({ page }) => {
        const BASE_URL = process.env.BASE_URL || 'https://zakfarm.com';
        const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
        await page.goto(BASE_URL, { timeout: API_TIMEOUT });
        await page.waitForLoadState('domcontentloaded', { timeout: API_TIMEOUT });
        const homePage = new HomePage(page);
        const productSelector = '.woocommerce ul.products li';
        await page.waitForSelector(productSelector, { state: 'visible', timeout: API_TIMEOUT });
        const allProducts = await homePage.getFeaturedProducts();
        console.log('All found products (EN):', allProducts);
        expect(allProducts && allProducts.length > 0).toBeTruthy();
        const firstProduct = await homePage.getFeaturedProduct(0);
        console.log('Selected product (EN):', firstProduct);
        expect(firstProduct).toBeDefined();
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        // No hanging promises, test will finish here
    });

    test('Should handle product details correctly in Russian', async ({ page }) => {
        const BASE_URL_RU = process.env.BASE_URL_RU || 'https://zakfarm.com/ru';
        const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
        await page.goto(BASE_URL_RU, { timeout: API_TIMEOUT });
        await page.waitForLoadState('domcontentloaded', { timeout: API_TIMEOUT });
        const homePage = new HomePage(page);
        const productSelector = '.woocommerce ul.products li';
        await page.waitForSelector(productSelector, { state: 'visible', timeout: API_TIMEOUT });
        const allProducts = await homePage.getFeaturedProducts();
        console.log('All found products (RU):', allProducts);
        expect(allProducts && allProducts.length > 0).toBeTruthy();
        const firstProduct = await homePage.getFeaturedProduct(0);
        console.log('Selected product (RU):', firstProduct);
        expect(firstProduct).toBeDefined();
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        // No hanging promises, test will finish here
    });
});