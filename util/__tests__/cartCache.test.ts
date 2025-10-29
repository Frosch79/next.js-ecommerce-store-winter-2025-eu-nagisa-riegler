import { expect, test } from '@jest/globals';
import { testCart } from '../cartCache';

test('add cached cart data and products data', () => {
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

  const cacheDataFirst = [
    { id: 1, count: 3 },
    { id: 3, count: 5 },
    { id: 4, count: 1 },
  ];

  const cacheDataSecond = [
    { id: 5, count: 2 },
    { id: 1, count: 3 },
    { id: 3, count: 1 },
  ];
  const cacheDataThird: any[] = [];

  expect(testCart(cacheDataFirst, products)).toStrictEqual([
    { id: 1, price: 500, productName: 'Cat-Walk', count: 3 },
    { id: 3, price: 3, productName: 'Toy', count: 5 },
    { id: 4, price: 25, productName: 'Toilet', count: 1 },
  ]);
  expect(testCart(cacheDataSecond, products)).toStrictEqual([
    { id: 5, price: 100, productName: 'Sofa', count: 2 },
    { id: 1, price: 500, productName: 'Cat-Walk', count: 3 },
    { id: 3, price: 3, productName: 'Toy', count: 1 },
  ]);
  expect(testCart(cacheDataThird, products)).toStrictEqual([]);
});

test('add cached cart data and products data', () => {
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

  const cacheDataFirst = [
    { id: '', count: true },
    { id: 9, count: 'five' },
    { id: null, count: 1 },
  ];

  const cacheDataSecond = [
    { id: false, count: 2 },
    { id: 'cat', count: 5 },
    { id: 3, count: undefined },
  ];

  const cacheDataThird = [
    { id: 53, count: 2 },
    { id: 92, count: 5 },
    { id: 35, count: 6 },
  ];
  // @ts-expect-error

  expect(() => testCart(cacheDataFirst, products)).toThrow('Pass only number');

  // @ts-expect-error
  expect(() => testCart(cacheDataSecond, products)).toThrow('Pass only number');

  expect(() => testCart(cacheDataThird, products)).toThrow('Product not found');
});
