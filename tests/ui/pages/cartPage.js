// tests/ui/pages/cartPage.js
const BasePage = require('./basePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors specific to Cart page
        this.cartItems = '.cart-item';
        this.checkoutButton = '.checkout-button';
        this.totalAmount = '.total-amount';
        this.removeItemButton = '.remove-item';
        this.quantityInput = '.quantity-input';
    }

    /**
     * Get total amount
     * @returns {Promise<string>}
     */
    async getTotal() {
        return await this.getText(this.totalAmount);
    }

    /**
     * Update item quantity
     * @param {number} index 
     * @param {number} quantity 
     */
    async updateQuantity(index, quantity) {
        const items = await this.page.$$(this.cartItems);
        await items[index].$(this.quantityInput).fill(String(quantity));
    }

    /**
     * Remove item from cart
     * @param {number} index 
     */
    async removeItem(index) {
        const items = await this.page.$$(this.cartItems);
        await items[index].$(this.removeItemButton).click();
    }

    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
        await this.click(this.checkoutButton);
    }
}

module.exports = CartPage;