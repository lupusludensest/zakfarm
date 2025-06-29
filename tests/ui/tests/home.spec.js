// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\tests\home.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const path = require('path');

test.describe('Home Page Tests', () => {
    let homePage;
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');

    test.beforeEach(async ({ page }) => {
        // Disable screenshots for faster test execution
        process.env.SKIP_SCREENSHOTS = 'true';
        
        console.log('BASE_URL:', process.env.BASE_URL);
        homePage = new HomePage(page);
        
        // Navigate and wait for load
        await homePage.goto();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');
        
        // Log page info
        console.log('Current URL:', await page.url());
        console.log('Page title:', await page.title());
    });

    test('Should handle product details correctly', async ({ page }) => {
        try {
            // Wait for product elements to be visible
            const productSelector = '.woocommerce ul.products li';
            await test.step('Wait for products to be visible', async () => {
                await page.waitForSelector(productSelector, { 
                    state: 'visible',
                    timeout: 30000
                });
            });
            
            // Get all products first to verify the data
            const allProducts = await test.step('Get all products', async () => {
                return await homePage.getFeaturedProducts();
            });
            
            console.log('All found products:', allProducts);
            
            if (!allProducts || allProducts.length === 0) {
                console.log('No products found, checking page content...');
                const html = await page.content();
                console.log('Current HTML:', html.substring(0, 1000));
                test.fail();
                return;
            }
            
            // Get and verify the first product
            const product = await test.step('Get and verify first product', async () => {
                const firstProduct = await homePage.getFeaturedProduct(0);
                console.log('Selected product:', firstProduct);
                
                // Verify product data
                expect(firstProduct).toBeDefined();
                expect(firstProduct).toHaveProperty('name');
                expect(firstProduct).toHaveProperty('price');
                
                return firstProduct;
            });
            
            // Log success
            console.log('Successfully verified product:', {
                name: product.name,
                price: product.price
            });
            
        } catch (error) {
            console.error('Test error:', error);
            
            // Log error details
            console.log('Error details:', {
                message: error.message,
                stack: error.stack,
                url: await page.url()
            });
            
            throw error;
        }
    });
});