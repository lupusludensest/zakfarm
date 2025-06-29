// tests/ui/pages/homePage.js
const BasePage = require('./basePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Updated selectors for zakfarm.com
        this.productList = '.catalog';  // Main product container
        this.productCards = '.product'; // Individual product cards
        this.productName = '.product-name a';
        this.productPrice = '.price';
        this.searchInput = 'input[name="search"]';
        this.searchButton = 'button[type="submit"]';
        this.languageSelector = '.language';
        this.cartIcon = '.cart';
    }

    /**
     * Get all featured products
     * @returns {Promise<Array<{name: string, price: string}>>}
     */
    async getFeaturedProducts() {
        try {
            // Wait for catalog to be visible
            await this.page.waitForSelector(this.productList, { 
                state: 'visible',
                timeout: 10000 
            });

            // Wait additional time for products to load
            await this.page.waitForSelector(this.productCards, {
                state: 'visible',
                timeout: 10000
            });

            const products = await this.page.$$(this.productCards);
            console.log(`Found ${products.length} products on the page`);
            
            const featuredProducts = [];
            
            for (const product of products) {
                try {
                    const nameElement = await product.$(this.productName);
                    const priceElement = await product.$(this.productPrice);
                    
                    const name = nameElement ? 
                        await nameElement.textContent().then(text => text.trim()) : 
                        'No name';
                    
                    const price = priceElement ? 
                        await priceElement.textContent().then(text => text.trim()) : 
                        'No price';
                    
                    featuredProducts.push({ name, price });
                } catch (error) {
                    console.log('Error processing product:', error.message);
                }
            }
            
            return featuredProducts;
        } catch (error) {
            console.log('Error in getFeaturedProducts:', error);
            return [];
        }
    }

    /**
     * Get specific featured product by index
     * @param {number} index 
     * @returns {Promise<{name: string, price: string}>}
     */
    async getFeaturedProduct(index) {
        const products = await this.getFeaturedProducts();
        
        if (products.length === 0) {
            throw new Error('No products found on the page');
        }
        
        if (index >= products.length) {
            throw new Error(`Product with index ${index} not found. Total products: ${products.length}`);
        }
        
        return products[index];
    }

    /**
     * Ensure we're on the Russian version of the site
     */
    async ensureRussianVersion() {
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/ru')) {
            await this.page.goto(`${this.url}/ru`);
            await this.page.waitForLoadState('networkidle');
        }
    }

    /**
     * Navigate to base URL and ensure Russian version
     */
    async goto() {
        await super.goto();
        await this.ensureRussianVersion();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = HomePage;