// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\pages\homePage.js
const BasePage = require('./basePage');
const path = require('path');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.screenshotsDir = path.join(__dirname, '..', 'screenshots');
        
        // Selectors for HomePage
        this.productContainers = [
            '.woocommerce ul.products li',
            'div.product',
            'article',
            '.product-item',
            '.type-product'
        ];
        this.productSelectors = {
            name: [
                'h2.woocommerce-loop-product__title',
                '.product-title',
                'h2 a',
                '.woocommerce-loop-product__title'
            ],
            price: [
                '.price',
                '.woocommerce-Price-amount',
                'span.price',
                '.product-price'
            ]
        };
    }

    /**
     * Get text content safely
     * @param {ElementHandle} element 
     * @param {string} selector 
     * @returns {Promise<string>}
     */
    async safeGetText(element, selector) {
        try {
            const elem = await element.$(selector);
            if (elem) {
                return (await elem.textContent() || '').trim();
            }
        } catch (error) {
            console.log(`Error getting text for selector ${selector}:`, error.message);
        }
        return '';
    }

    /**
     * Take a screenshot safely
     * @param {string} name 
     * @returns {Promise<void>}
     */
    async safeScreenshot(name) {
        try {
            if (process.env.SKIP_SCREENSHOTS === 'true') {
                console.log('Screenshots disabled, skipping...');
                return;
            }

            const screenshotPromise = this.page.screenshot({
                path: path.join(this.screenshotsDir, `${name}-${Date.now()}.png`),
                fullPage: false, // Changed to false for faster screenshots
                timeout: 5000
            });

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Screenshot timeout')), 5000);
            });

            await Promise.race([screenshotPromise, timeoutPromise]).catch(error => {
                console.log(`Screenshot failed for ${name}:`, error.message);
            });
        } catch (error) {
            console.log(`Screenshot failed for ${name}:`, error.message);
        }
    }

    /**
     * Get all featured products
     * @returns {Promise<Array<{name: string, price: string}>>}
     */
    async getFeaturedProducts() {
        const foundProducts = [];
        
        try {
            // Wait for products to be visible with increased timeout
            await this.page.waitForSelector(this.productContainers[0], { 
                state: 'visible',
                timeout: 30000 
            });

            // Try each product container selector
            for (const containerSelector of this.productContainers) {
                try {
                    console.log(`Trying selector: ${containerSelector}`);
                    const elements = await this.page.$$(containerSelector);
                    
                    if (elements.length > 0) {
                        console.log(`Found ${elements.length} products with selector: ${containerSelector}`);
                        
                        // Process products in smaller batches to avoid timeouts
                        const batchSize = 10;
                        for (let i = 0; i < elements.length; i += batchSize) {
                            const batch = elements.slice(i, i + batchSize);
                            const batchPromises = batch.map(async (element) => {
                                try {
                                    let name = '';
                                    for (const nameSelector of this.productSelectors.name) {
                                        name = await this.safeGetText(element, nameSelector);
                                        if (name) break;
                                    }

                                    let price = '';
                                    for (const priceSelector of this.productSelectors.price) {
                                        price = await this.safeGetText(element, priceSelector);
                                        if (price) break;
                                    }

                                    if (name || price) {
                                        return {
                                            name: name || 'Unnamed Product',
                                            price: price || 'Price not available'
                                        };
                                    }
                                } catch (productError) {
                                    console.log('Error processing individual product:', productError.message);
                                }
                                return null;
                            });

                            const batchProducts = (await Promise.all(batchPromises))
                                .filter(product => product !== null);
                            foundProducts.push(...batchProducts);
                        }
                        
                        if (foundProducts.length > 0) break;
                    }
                } catch (selectorError) {
                    console.log(`Error with selector ${containerSelector}:`, selectorError.message);
                }
            }

            // Take screenshot only if products were found
            if (foundProducts.length > 0) {
                await this.safeScreenshot('products-found');
            }

            console.log(`Total products found: ${foundProducts.length}`);
            console.log('All found products:', foundProducts);

        } catch (error) {
            console.error('Error in getFeaturedProducts:', error);
            await this.safeScreenshot('error-products');
        }

        return foundProducts;
    }

    /**
     * Get specific featured product by index
     * @param {number} index 
     * @returns {Promise<{name: string, price: string}>}
     */
    async getFeaturedProduct(index) {
        try {
            const products = await this.getFeaturedProducts();
            
            if (!products || products.length === 0) {
                await this.safeScreenshot('no-products');
                throw new Error('No products found on the page');
            }
            
            if (index >= products.length) {
                throw new Error(`Product with index ${index} not found. Total products: ${products.length}`);
            }
            
            return products[index];
        } catch (error) {
            console.error('Error in getFeaturedProduct:', error);
            throw error;
        }
    }
}

module.exports = HomePage;