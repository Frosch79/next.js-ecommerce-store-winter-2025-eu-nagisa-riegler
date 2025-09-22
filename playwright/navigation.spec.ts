import { expect, test } from '@playwright/test';
import dayjs from 'dayjs';

const products = [
  {
    id: 1,
    productName: 'Cat-Walk',
    price: 500,
  },
  {
    id: 2,
    productName: 'Food',
    price: 15,
  },
  {
    id: 3,
    productName: 'Toy',
    price: 3,
  },
  {
    id: 4,
    productName: 'Toilet',
    price: 25,
  },
  {
    id: 5,
    productName: 'Sofa',
    price: 100,
  },
];

test(' Add to cart, change quantity and remove from cart', async ({ page }) => {
  await page.goto('/');
  async function cart(quantity: number) {
    // if cart is added or removed

    await expect(
      page
        .locator('header')
        .locator(
          `[data-test-id="cart-link"]:has-text("cart") > [data-test-id="cart-count"]:has-text("${quantity}")`,
        ),
    ).toBeVisible();
  }

  // Check the link to products page
  await page.getByTestId(`products-link`).click();
  await page.waitForURL('/products');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  let i = 0;
  for (const product of products) {
    await expect(page.getByTestId(`product-${product.id}`)).toHaveText(
      product.productName.replace('-', ' '),
    );
    await expect(page.getByTestId('product-image').nth(i)).toBeVisible();
    i++;
  }

  // Check a product page ,if add products to the cart
  let count = 0;
  for (const product of products) {
    const productCount = Math.floor(Math.random() * 5);
    count += productCount;
    await page.getByTestId(`products-link`).click();
    await page.waitForURL('/products');
    await page.getByTestId(`product-${product.id}`).click();
    await page.waitForURL(`**/products/${product.id}`);

    await expect(page.getByTestId('product-image')).toBeVisible();
    await expect(page.getByTestId('product-price')).toBeVisible();
    await expect(page.getByTestId('product-quantity')).toBeVisible();
    if (productCount > 0) {
      for (let n = 1; n < productCount; n++) {
        await page.getByRole('button', { name: '+' }).click();
      }
      await page.getByTestId('product-add-to-cart').click();
    }
  }
  await cart(count);
  await page.getByTestId(`cart-link`).click();
  await page.waitForURL('/users/cart');

  // Remove items
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const cartLength = (
    await page.locator('[data-test-id*="cart-product-quantity"]').all()
  ).length;

  const randomRemove = Math.floor(Math.random() * cartLength);
  if (cartLength > 0) {
    // check if remove a product
    const searchText = await page
      .locator('[data-test-id*="cart-product-quantity"]')
      .nth(randomRemove)
      .innerText();
    const removeCount = searchText.slice(searchText.indexOf('×') + 1).trim();
    count -= Number(removeCount);

    await page
      .getByRole('button', { name: 'remove' })
      .nth(randomRemove)
      .click();
    await cart(count);
  }
});

const exUsersData = [
  {
    id: 1,
    firstName: 'haul',
    lastName: 'castle',
    email: 'sofy@gmail.com',
    address: '7 Moving Castle St.',
    city: 'Kingsbury',
    postalCode: 10001,
    country: 'Fantasyland',
    creditCard: 4242424242424242, // test only
    expirationDate: new Date('2026-12-31'),
    securityCode: 123,
  },
  {
    id: 2,
    firstName: 'mei',
    lastName: 'satsuki',
    email: 'totoro@gmail.com',
    address: '12 Forest Path',
    city: 'Matsugo',
    postalCode: 15002,
    country: 'Japan',
    creditCard: 4000056655665556, // test only
    expirationDate: new Date('2027-05-31'),
    securityCode: 456,
  },
  {
    id: 3,
    firstName: 'jiji',
    lastName: 'kiki',
    email: 'kuroneko@gmail.com',
    address: '3 Broomstick Ave.',
    city: 'Koriko',
    postalCode: 20011,
    country: 'Japan',
    creditCard: 5555555555554444, // test only
    expirationDate: new Date('2028-03-31'),
    securityCode: 789,
  },
  {
    id: 4,
    firstName: 'pazu',
    lastName: 'sheeta',
    email: 'laputa@gmail.com',
    address: '1 Sky Island Rd.',
    city: 'Laputa',
    postalCode: 30022,
    country: 'Floating Kingdom',
    creditCard: 6011111111111117, // test only
    expirationDate: new Date('2026-09-30'),
    securityCode: 321,
  },
  {
    id: 5,
    firstName: 'porco',
    lastName: 'rosso',
    email: 'pig@gmail.com',
    address: '5 Adriatic Harbor',
    city: 'Milan',
    postalCode: 40033,
    country: 'Italy',
    creditCard: 378282246310005, // test only
    expirationDate: new Date('2029-07-31'),
    securityCode: 4321,
  },
];

// test checkout
test('Checkout flow, payment page, thank you page', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId(`products-link`).click();
  await page.waitForURL('/products');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Check a product page ,if add products to the cart

  for (const product of products) {
    const productCount = Math.floor(Math.random() * products.length);

    await page.getByTestId(`products-link`).click();
    await page.waitForURL('/products');
    await page.getByTestId(`product-${product.id}`).click();
    await page.waitForURL(`/products/${product.id}`);

    await expect(page.getByTestId('product-quantity')).toBeVisible();
    if (productCount > 0) {
      for (let n = 1; n < productCount; n++) {
        await page.getByRole('button', { name: '+' }).click();
      }
      await page.getByTestId('product-add-to-cart').click();
    }
  }

  await page.getByTestId(`cart-link`).click();
  await page.waitForURL('/users/cart');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const cartLength = (
    await page.locator('[data-test-id*="cart-product-quantity"]').all()
  ).length;

  await page.getByTestId('cart-checkout').click();
  await page.waitForURL('/check-out');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await expect(page.getByTestId('checkout-first-name')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-last-name')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-email')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-address')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-city')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-postal-code')).toHaveRole(
    'spinbutton',
  );
  await expect(page.getByTestId('checkout-country')).toHaveRole('textbox');
  await expect(page.getByTestId('checkout-credit-card')).toHaveRole(
    'spinbutton',
  );
  await expect(page.getByTestId('checkout-expiration-date')).toHaveRole(
    'textbox',
  );
  await expect(page.getByTestId('checkout-security-code')).toHaveRole(
    'spinbutton',
  );
  // Fill user data from demy data
  const randomUserData = Math.floor(
    Math.random() * (exUsersData.length - 1) + 1,
  );

  if (exUsersData[randomUserData]) {
    await page
      .getByTestId('checkout-first-name')
      .fill(exUsersData[randomUserData].firstName);
    await page
      .getByTestId('checkout-last-name')
      .fill(exUsersData[randomUserData].lastName);
    await page
      .getByTestId('checkout-email')
      .fill(exUsersData[randomUserData].email);
    await page
      .getByTestId('checkout-address')
      .fill(exUsersData[randomUserData].address);
    await page
      .getByTestId('checkout-city')
      .fill(exUsersData[randomUserData].city);
    await page
      .getByTestId('checkout-postal-code')
      .fill(exUsersData[randomUserData].postalCode.toString());
    await page
      .getByTestId('checkout-country')
      .fill(exUsersData[randomUserData].country);
    await page
      .getByTestId('checkout-credit-card')
      .fill(exUsersData[randomUserData].creditCard.toString());
    await page
      .getByTestId('checkout-expiration-date')
      .fill(
        dayjs(exUsersData[randomUserData].expirationDate).format('YYYY-MM-DD'),
      );
    await page
      .getByTestId('checkout-security-code')
      .fill(exUsersData[randomUserData].securityCode.toString());

    await page.getByRole('button', { name: 'Confirm Order' }).click();

    if (cartLength === 0) {
      await expect(page.getByText('Cart is empty !')).toBeVisible();
    } else {
      // if cart is not empty
      await page.waitForURL('/greeting');
      await expect(page).toHaveTitle(/Thank you for your order/);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      await expect(
        page
          .locator('header')
          .locator(
            `[data-test-id="cart-link"]:has-text("cart") > [data-test-id="cart-count"]:has-text("0")`,
          ),
      ).toBeVisible();
      await page.getByTestId(`cart-link`).click();
      await page.waitForURL('/users/cart');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(
        (await page.locator('[data-test-id*="cart-product"]').all()).length,
      ).toBe(0);
    }
  }
});
