// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\tests\home.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const { PRODUCTS } = require('../utils/products_en_ru');
const Helpers = require('../utils/helpers');

async function runProductDetailsTest(page, baseUrl, language) {
    const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
    await page.goto(baseUrl, { timeout: API_TIMEOUT });
    await page.waitForLoadState('domcontentloaded', { timeout: API_TIMEOUT });
    const homePage = new HomePage(page);
    const productSelector = '.woocommerce ul.products li';
    await page.waitForSelector(productSelector, { state: 'visible', timeout: API_TIMEOUT });
    const allProducts = await homePage.getFeaturedProducts();
    console.log(`All found products (${language}):`, allProducts);
    expect(allProducts && allProducts.length > 0).toBeTruthy();

    const nameKey = language === 'EN' ? 'en_name' : 'ru_name';
    const missingProducts = [];
    
    for (const expected of PRODUCTS) {
        if (!expected[nameKey]) {
            console.warn(`Product missing ${language} name:`, expected);
            continue;
        }
        
        try {
            const match = allProducts.find(actual =>
                Helpers.normalize(actual.name) === Helpers.normalize(expected[nameKey]) &&
                actual.price.trim() === expected.price.trim()
            );
            
            expect(match).toBeTruthy();
        } catch (error) {
            missingProducts.push(`${expected[nameKey]} (${expected.price})`);
        }
    }
    
    if (missingProducts.length > 0) {
        console.warn(`SUMMARY: ${missingProducts.length} products missing:`, missingProducts);
        throw new Error(`${missingProducts.length} products are missing from the page`);
    }
}

test.describe('Home Page Tests', () => {
    test('Should handle product details correctly in English', async ({ page }) => {
        const BASE_URL = process.env.BASE_URL || 'https://zakfarm.com';
        await runProductDetailsTest(page, BASE_URL, 'EN');
    });

    test('Should handle product details correctly in Russian', async ({ page }) => {
        const BASE_URL_RU = process.env.BASE_URL_RU || 'https://zakfarm.com/ru';
        await runProductDetailsTest(page, BASE_URL_RU, 'RU');
    });
});