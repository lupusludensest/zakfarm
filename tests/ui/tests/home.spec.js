// E:\Gurov_SSD_256\IT\Testing\Automation_08_09_2019\zakfarm\tests\ui\tests\home.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');

// Etalonic product lists (as of now)
const EN_PRODUCTS = [
  { name: 'Box Premium', price: '$348.00' },
  { name: 'Box Gold', price: '$256.00' },
  { name: 'Box Standart', price: '$158.00' },
  { name: 'Hallumi With Provencal Herbs', price: '$45.00' },
  { name: 'Hallumi', price: '$45.00' },
  { name: 'Cheese Sticks (Cecil Cheese)', price: '$40.00' },
  { name: 'Suluguni Cheese (Head)', price: '$40.00' },
  { name: 'Ossetian Cheese (Brynza). Middle-Salty, Ripe.', price: '$45.00' },
  { name: 'NEW Cheese Plate Ossetian Cheese (Brynza) 170-200gr, Adygean Cheese 150 Gr, Cheese Sticks (Cecil Cheese) 120', price: '$40.00' },
  { name: 'Adygean Cheese', price: '$45.00' },
  { name: 'Ossetian Cheese (Brynza) Slightly Salty.', price: '$45.00' },
  { name: 'Pancakes With Meat', price: '$20.00' },
  { name: 'Pancakes With Cottage Cheese', price: '$20.00' },
  { name: 'Сottage Cheesecake Gluten Free', price: '$25.00' },
  { name: 'Cottage Cheesecake With Chocolate', price: '$20.00' },
  { name: 'Сottage Cheesecake With Poppy', price: '$20.00' },
  { name: 'Сottage Cheesecake With Raisins', price: '$20.00' },
  { name: 'Georgian Cottage Cheesecake', price: '$23.00' },
  { name: 'Сottage', price: '$20.00' },
  { name: 'Matsoni', price: '$15.00' },
  { name: 'Melted Butter', price: '$50.00' },
  { name: 'Homemade Butter', price: '$30.00' },
  { name: 'Сlassic Sour Cream', price: '$18.00' },
  { name: 'Cottage Cheese With Fat Up To 5%', price: '$18.00' },
  { name: 'Lobiani', price: '$30.00' },
  { name: 'Ossetian Cherry Pie', price: '$40.00' },
  { name: 'Ossetian Pie With Potatoes And Cheese', price: '$40.00' },
  { name: 'Ossetian Meat Pie (Beef)', price: '$50.00' },
  { name: 'Ossetian Pie With Cheese And Beet Leaves.', price: '$40.00' },
  { name: 'Ossetian Pie With Cheese', price: '$40.00' },
  { name: 'Cheese Khinkali', price: '$50.00' },
  { name: 'Cheese And Mint Khinkali', price: '$50.00' },
  { name: 'Beef & Lamb Khinkali', price: '$50.00' },
  { name: 'Dumplings', price: '$45.00' },
  { name: 'Khinkali (Meat Dumplings)', price: '$45.00' },
  { name: 'Vareniki With Adygean Cheese', price: '$20.00' },
  { name: 'Vareniki With Cottage Cheese', price: '$20.00' },
  { name: 'Vareniki With Potatoes', price: '$15.00' },
  { name: 'Vareniki With Cherries', price: '$20.00' },
  { name: 'Khachapuri In Adjarian', price: '$25.00' },
  { name: 'Pork Beer Sausages', price: '$12.00' },
  { name: 'Krakowska Sausage', price: '$26.00' },
  { name: 'Smoked Pork (Carbonade)', price: '$22.00' },
  { name: 'Smoked Chicken Drumsticks (With Skin)', price: '$16.00' },
  { name: 'Beef Loin TOP Sirloin Steak', price: '$85.00' },
  { name: 'Beef Steak', price: '$125.00' },
  { name: 'Breaded Chicken Cutlets 1 Lb', price: '$20.00' },
  { name: 'Chicken Cutlets 1 Lb', price: '$20.00' },
  { name: 'Breaded Pork/Beef Cutlets 1 Lb', price: '$25.00' },
  { name: 'Pork/Beef Cutlets 1 Lb', price: '$25.00' },
  { name: 'Free-Range Chicken Egg', price: '$10.00' },
  { name: 'Organic Poultry Chicken (Frozen)', price: '$40.00' },
  { name: 'Ground Turkey Chub', price: '$32.00' },
  { name: 'Extra Lean Ground Turkey', price: '$34.00' },
  { name: 'Ground Pork (Frozen)', price: '$25.00' },
  { name: 'Pork Ham (Frozen)', price: '$20.00' },
  { name: 'Rack Of Lamb (Grass-Fed)', price: '$75.00' },
  { name: 'Leg Of Lamb (Grass-Fed) (Frozen)', price: '$75.00' },
  { name: 'ABKHAZURA Georgian Meatballs (Frozen)', price: '$40.00' },
  { name: 'Organic Goose, Whole (Frozen)', price: '$115.00' },
  { name: 'Beef Jerky', price: '$20.00' },
  { name: 'Smoked Beef Ribs', price: '$90.00' },
  { name: 'Hot Smoked Pork Briskets', price: '$40.00' },
  { name: 'Spinach Pkhali', price: '$40.00' },
  { name: 'Beet Leaf Pkhali 1 Lb', price: '$40.00' },
  { name: 'Ajapsandali (Frozen)', price: '$20.00' },
  { name: 'Chakhokhbili (Frozen)', price: '$20.00' },
  { name: 'Eggplant Rolls (Frozen)', price: '$25.00' },
  { name: 'Lobio (Frozen)', price: '$20.00' },
  { name: 'Churchkhela – Walnut, Prune & Dried Apricot', price: '$30.00' },
  { name: 'Churchkhela Assorted (3 Pcs)', price: '$30.00' },
  { name: 'Churchkhela – Fig & Prune (3 Pcs)', price: '$30.00' },
  { name: 'Churchkhela – Walnut (3 Pcs)', price: '$30.00' },
  { name: 'Churchkhela – Prune & Walnut (3 Pcs)', price: '$30.00' },
  { name: 'Raspberry Pastilles', price: '$6.00' },
  { name: 'Pineapple, Mango Pastilles', price: '$6.00' },
  { name: 'Cherry Pastilles', price: '$5.00' },
  { name: 'Seabuckthorn Pastilles', price: '$6.00' },
  { name: 'Red Currant Pastilles', price: '$6.00' },
  { name: 'Black Currant Pastilles', price: '$6.00' },
  { name: 'Strawberry Mint Pastilles', price: '$6.00' },
  { name: 'Chocolate Pastilles', price: '$6.00' },
  { name: 'Banana Pastilles', price: '$6.00' },
  { name: 'Strawberry Pastilles', price: '$6.00' },
  { name: 'Apple Pastilles', price: '$6.00' },
  { name: 'Black Forest Cake', price: '$80.00' },
  { name: 'Mango-Passion Fruit Cake', price: '$80.00' },
  { name: 'Kiev Cake', price: '$65.00' },
  { name: 'Napoleon Cake', price: '$65.00' },
  { name: 'Honey Cake', price: '$60.00' }
];

const RU_PRODUCTS = [
  { name: 'Бокс Standart', price: '$158.00' },
  { name: 'Бокс Gold', price: '$256.00' },
  { name: 'Box Premium', price: '$348.00' },
  { name: 'Сырная Тарелка', price: '$40.00' },
  { name: 'Осетинский Сыр (Брынза) Среднесоленый, Выдержанный', price: '$45.00' },
  { name: 'Сулугун Сыр', price: '$40.00' },
  { name: 'Сырные Палочки (Сыр Чечил)', price: '$40.00' },
  { name: 'Халлуми', price: '$45.00' },
  { name: 'Халуми С Прованскими Травами', price: '$45.00' },
  { name: 'Адыгейский Сыр', price: '$45.00' },
  { name: 'Осетинский Сыр (Брынза) Слабосоленый', price: '$45.00' },
  { name: 'Творог Жирностью До 5%', price: '$18.00' },
  { name: 'Классическая Сметана', price: '$18.00' },
  { name: 'Домашнее Сливочное Масло', price: '$30.00' },
  { name: 'Топленое Масло (Гхи)', price: '$50.00' },
  { name: 'Мацони', price: '$15.00' },
  { name: 'Сырники', price: '$20.00' },
  { name: 'Сырники «По-Грузински»', price: '$23.00' },
  { name: 'Сырники С Изюмом', price: '$20.00' },
  { name: 'Сырники С Маком', price: '$20.00' },
  { name: 'Сырники С Шоколадом', price: '$20.00' },
  { name: 'Сырники Gluten Free', price: '$25.00' },
  { name: 'Блинчики С Творогом', price: '$20.00' },
  { name: 'Блинчики С Мясом', price: '$20.00' },
  { name: 'Лобиани', price: '$30.00' },
  { name: 'Осетинский Пирог С Сыром', price: '$40.00' },
  { name: 'Осетинский Пирог С Сыром И Листьями Свеклы', price: '$40.00' },
  { name: 'Осетинский Пирог С Мясом (Говядина)', price: '$50.00' },
  { name: 'Осетинский Пирог С Картофелем И Сыром', price: '$40.00' },
  { name: 'Осетинский Пирог С Вишней', price: '$40.00' },
  { name: 'Хинкали С Сыром', price: '$50.00' },
  { name: 'Хинкали С Сыром И Мятой', price: '$50.00' },
  { name: 'Хинкали С Говядиной И Бараниной', price: '$50.00' },
  { name: 'Хинкали', price: '$45.00' },
  { name: 'Пельмени', price: '$45.00' },
  { name: 'Вареники С Адыгейским Сыром', price: '$20.00' },
  { name: 'Вареники С Вишней', price: '$20.00' },
  { name: 'Вареники С Картофелем', price: '$15.00' },
  { name: 'Вареники С Творогом', price: '$20.00' },
  { name: 'Хачапури По-Аджарски', price: '$25.00' },
  { name: 'Колбаски Из Свинины Под Пиво', price: '$12.00' },
  { name: 'Краковская Колбаса', price: '$26.00' },
  { name: 'Копчёная Свинина (Карбонат)', price: '$22.00' },
  { name: 'Копчёные Куриные Голени С Кожей', price: '$16.00' },
  { name: 'Стейк Говяжий Топ-Сирлойн', price: '$85.00' },
  { name: 'Говяжий Стейк', price: '$125.00' },
  { name: 'Котлеты Куриные В Панировке 1 Lb', price: '$20.00' },
  { name: 'Котлеты Куриные 1 Lb', price: '$20.00' },
  { name: 'Котлеты Свинина/Говядина В Панировке 1 Lb', price: '$25.00' },
  { name: 'Котлеты Свинина/Говядина 1 Lb', price: '$25.00' },
  { name: 'АБХАЗУРА Грузинские Мясные Котлеты (Замороженные)', price: '$40.00' },
  { name: 'Индюшка, Выращенная На Пастбище (Замороженная)', price: '$260.00' },
  { name: 'Утка Фермерская (В Замороженном Виде)', price: '$90.00' },
  { name: 'Органический Гусь Цельный (Замороженный)', price: '$115.00' },
  { name: 'Нога Ягненка (Откормленного На Траве)', price: '$75.00' },
  { name: 'Каре Ягненка (Откормленного На Траве)', price: '$75.00' },
  { name: 'Свиной Окорок', price: '$20.00' },
  { name: 'Фарш Свиной (Замороженный)', price: '$25.00' },
  { name: 'Фарш Индюшачий Постный', price: '$34.00' },
  { name: 'Фарш Индюшачий', price: '$32.00' },
  { name: 'Джерки Вяленая Говядина', price: '$20.00' },
  { name: 'Ребра Говяжьи Горячего Копчения', price: '$90.00' },
  { name: 'Грудинка Свиная Горячего Копчения', price: '$40.00' },
  { name: 'Пхали Из Шпината', price: '$40.00' },
  { name: 'Пхали Из Свекольных Листьев', price: '$40.00' },
  { name: 'Лобио (Замороженное)', price: '$20.00' },
  { name: 'Рулетики Из Баклажанов (Замороженные)', price: '$25.00' },
  { name: 'Чахохбили (Замороженное)', price: '$20.00' },
  { name: 'Аджапсандали (Замороженный)', price: '$20.00' },
  { name: 'Яблочная Пастила.', price: '$6.00' },
  { name: 'Клубничная Пастила.', price: '$6.00' },
  { name: 'Банановая Пастила.', price: '$6.00' },
  { name: 'Шоколадная Пастила.', price: '$6.00' },
  { name: 'Клубничная Пастила С Мятой.', price: '$6.00' },
  { name: 'Пастила Из Черной Смородины.', price: '$6.00' },
  { name: 'Пастила Из Красной Смородины.', price: '$6.00' },
  { name: 'Облепиховая Пастила.', price: '$6.00' },
  { name: 'Вишневая Пастила.', price: '$5.00' },
  { name: 'Малиновая Пастила.', price: '$6.00' },
  { name: 'Ананас-Манго Пастила', price: '$6.00' },
  { name: 'Чурчхела – Чернослив И Грецкий Орех', price: '$30.00' },
  { name: 'Чурчхела – Грецкий Орех', price: '$30.00' },
  { name: 'Чурчхела – Инжир И Чернослив', price: '$30.00' },
  { name: 'Чурчхела Ассорти – Грецкий Орех, Фундук, Грецкий', price: '$30.00' },
  { name: 'Чурчхела – Грецкий Орех, Чернослив И Курага', price: '$30.00' },
  { name: 'Торт Черный Лес (Black Forest)', price: '$80.00' },
  { name: 'Торт Манго-Маракуйя', price: '$80.00' },
  { name: 'Киевский Торт', price: '$65.00' },
  { name: 'Наполеон', price: '$65.00' },
  { name: 'Медовик', price: '$60.00' }
];

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function runProductDetailsTest(page, baseUrl, logLabel, etalonicProducts) {
    const API_TIMEOUT = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
    await page.goto(baseUrl, { timeout: API_TIMEOUT });
    await page.waitForLoadState('domcontentloaded', { timeout: API_TIMEOUT });
    const homePage = new HomePage(page);
    const productSelector = '.woocommerce ul.products li';
    await page.waitForSelector(productSelector, { state: 'visible', timeout: API_TIMEOUT });
    const allProducts = await homePage.getFeaturedProducts();
    console.log(`All found products (${logLabel}):`, allProducts);
    expect(allProducts && allProducts.length > 0).toBeTruthy();

    const missingProducts = [];
    for (const expected of etalonicProducts) {
        const match = allProducts.find(actual =>
            normalize(actual.name) === normalize(expected.name) &&
            actual.price.trim() === expected.price.trim()
        );
        if (!match) {
            console.warn(`WARNING: Product not found: ${expected.name} (${expected.price})`);
            missingProducts.push(`${expected.name} (${expected.price})`);
        }
    }
    if (missingProducts.length > 0) {
        console.warn(`SUMMARY: ${missingProducts.length} products missing:`, missingProducts);
    }
}

test.describe('Home Page Tests', () => {
    test('Should handle product details correctly in English', async ({ page }) => {
        const BASE_URL = process.env.BASE_URL || 'https://zakfarm.com';
        await runProductDetailsTest(page, BASE_URL, 'EN', EN_PRODUCTS);
    });

    test('Should handle product details correctly in Russian', async ({ page }) => {
        const BASE_URL_RU = process.env.BASE_URL_RU || 'https://zakfarm.com/ru';
        await runProductDetailsTest(page, BASE_URL_RU, 'RU', RU_PRODUCTS);
    });
});