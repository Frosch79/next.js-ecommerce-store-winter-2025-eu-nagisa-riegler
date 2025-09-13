import { expect, test } from '@jest/globals';
import { allUserData, userShoppingCart } from '../dataStructure';

test('all user data', () => {
  const cartDate = new Date();
  const userData = [
    {
      userId: 1,
      firstName: 'haul',
      lastName: 'castle',
      email: 'sofy@gmail.com',
      cartId: 3,
      date: cartDate,
      userItemId: 1,
      productId: 2,
      quantity: 5,
    },
    {
      userId: 1,
      firstName: 'haul',
      lastName: 'castle',
      email: 'sofy@gmail.com',
      cartId: 4,
      date: cartDate,
      userItemId: 4,
      productId: 1,
      quantity: 9,
    },
  ];

  const testAllUserData = {
    id: 1,
    firstName: 'haul',
    lastName: 'castle',
    email: 'sofy@gmail.com',
    userCart: [
      {
        id: 3,
        userId: 1,
        date: cartDate,
      },
      { id: 4, userId: 1, date: cartDate },
    ],
    userItem: [
      { id: 1, productId: 2, cartId: 3, quantity: 5 },
      { id: 4, productId: 1, cartId: 4, quantity: 9 },
    ],
  };

  expect(allUserData(userData)).toStrictEqual(testAllUserData);
});

test('all user data', () => {
  const cartDate = new Date();
  const cartData = [
    {
      id: 5,
      userId: 1,
      date: cartDate,

      itemId: 3,
      cartId: 2,
      productId: 1,
      quantity: 5,
    },
  ];

  const cartCatsturcture = {
    id: 5,
    userId: 1,
    date: cartDate,
    userItem: [{ id: 3, cartId: 2, productId: 1, quantity: 5 }],
  };

  expect(userShoppingCart(cartData)).toStrictEqual(cartCatsturcture);
});
