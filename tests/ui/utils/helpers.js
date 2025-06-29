// tests/ui/utils/helpers.js
class Helpers {
    /**
     * Generate random email
     * @returns {string}
     */
    static generateRandomEmail() {
        return `test${Date.now()}@example.com`;
    }

    /**
     * Format price
     * @param {number} price 
     * @returns {string}
     */
    static formatPrice(price) {
        return price.toFixed(2);
    }

    /**
     * Generate random string
     * @param {number} length 
     * @returns {string}
     */
    static generateRandomString(length) {
        return Math.random().toString(36).substring(2, length + 2);
    }
}

module.exports = Helpers;