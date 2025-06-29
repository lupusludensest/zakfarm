// tests/ui/pages/catalogPage.js
const BasePage = require('./basePage');

class CatalogPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors specific to Catalog page
        this.productCards = '.product-card';
        this.filterSection = '.filter-section';
        this.sortDropdown = '.sort-dropdown';
        this.priceFilter = '.price-filter';
        this.categoryMenu = '.category-menu';
    }

    /**
     * Filter products by price range
     * @param {number} min 
     * @param {number} max 
     */
    async filterByPrice(min, max) {
        await this.type('[data-test="min-price"]', String(min));
        await this.type('[data-test="max-price"]', String(max));
        await this.click('.apply-filter');
    }

    /**
     * Sort products by specified criteria
     * @param {string} criteria - 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
     */
    async sortProducts(criteria) {
        await this.click(this.sortDropdown);
        await this.click(`[data-sort="${criteria}"]`);
    }

    /**
     * Add product to cart by index
     * @param {number} index 
     */
    async addToCart(index) {
        const productCards = await this.page.$$(this.productCards);
        await productCards[index].$('.add-to-cart-button').click();
    }
}

module.exports = CatalogPage;