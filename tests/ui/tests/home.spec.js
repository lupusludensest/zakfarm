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
        try {
            const BASE_URL = process.env.BASE_URL || 'https://zakfarm.com';
            const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
            await page.goto(BASE_URL);
            await page.waitForLoadState('domcontentloaded');
            const homePage = new HomePage(page);
            const productSelector = '.woocommerce ul.products li';
            await test.step('Wait for products to be visible', async () => {
                await page.waitForSelector(productSelector, {
                    state: 'visible',
                    timeout: API_TIMEOUT
                });
            });
            const allProducts = await test.step('Get all products', async () => {
                return await homePage.getFeaturedProducts();
            });
            console.log('All found products (EN):', allProducts);
            if (!allProducts || allProducts.length === 0) {
                console.log('No products found, checking page content...');
                const html = await page.content();
                console.log('Current HTML:', html.substring(0, 1000));
                test.fail();
                return;
            }
            const product = await test.step('Get and verify first product', async () => {
                const firstProduct = await homePage.getFeaturedProduct(0);
                console.log('Selected product (EN):', firstProduct);
                expect(firstProduct).toBeDefined();
                expect(firstProduct).toHaveProperty('name');
                expect(firstProduct).toHaveProperty('price');
                return firstProduct;
            });
            console.log('Successfully verified product (EN):', {
                name: product.name,
                price: product.price
            });
        } catch (error) {
            console.error('Test error (EN):', error);
            console.log('Error details (EN):', {
                message: error.message,
                stack: error.stack,
                url: await page.url()
            });
            throw error;
        }
    });

    test('Should handle product details correctly in Russian', async ({ page }) => {
        try {
            const BASE_URL_RU = process.env.BASE_URL_RU || 'https://zakfarm.com/ru';
            const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
            await page.goto(BASE_URL_RU);
            await page.waitForLoadState('domcontentloaded');
            const homePage = new HomePage(page);
            const productSelector = '.woocommerce ul.products li';
            await test.step('Wait for products to be visible', async () => {
                await page.waitForSelector(productSelector, {
                    state: 'visible',
                    timeout: API_TIMEOUT
                });
            });
            const allProducts = await test.step('Get all products', async () => {
                return await homePage.getFeaturedProducts();
            });
            console.log('All found products (RU):', allProducts);
            if (!allProducts || allProducts.length === 0) {
                console.log('No products found, checking page content...');
                const html = await page.content();
                console.log('Current HTML:', html.substring(0, 1000));
                test.fail();
                return;
            }
            const product = await test.step('Get and verify first product', async () => {
                const firstProduct = await homePage.getFeaturedProduct(0);
                console.log('Selected product (RU):', firstProduct);
                expect(firstProduct).toBeDefined();
                expect(firstProduct).toHaveProperty('name');
                expect(firstProduct).toHaveProperty('price');
                return firstProduct;
            });
            console.log('Successfully verified product (RU):', {
                name: product.name,
                price: product.price
            });
        } catch (error) {
            console.error('Test error (RU):', error);
            console.log('Error details (RU):', {
                message: error.message,
                stack: error.stack,
                url: await page.url()
            });
            throw error;
        }
    });
});