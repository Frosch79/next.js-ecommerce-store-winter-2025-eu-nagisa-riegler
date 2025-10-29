import { expect, test } from '@jest/globals';
import { calculateTotal, countCartItems } from '../totalCartSum';

test('add products and inside of cart ', () => {
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

  expect(calculateTotal(products, cacheDataFirst)).toBe(1540);
  expect(calculateTotal(products, cacheDataSecond)).toBe(1703);
  expect(calculateTotal(products, cacheDataThird)).toBe(0);
});

test('add products and inside of cart ', () => {
  const products = [
    {
      id: '2',
      productName: 156,
      price: false,
    },
    {
      id: 2,
      productName: 'Food',
      price: undefined,
    },
    {
      id: 3,
      productName: null,
      price: '25',
    },
    {
      id: 'toilet',
      productName: 'Toilet',
      price: 25,
    },
    {
      id: 5,
      productName: 'Sofa',
      price: 'hundred',
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
    { id: 3, count: 2 },
    { id: 5, count: 5 },
    { id: 3, count: 5 },
  ];
  // @ts-expect-error
  expect(() => calculateTotal(products, cacheDataFirst)).toThrow(
    'Pass only number',
  );
  // @ts-expect-error
  expect(() => calculateTotal(products, cacheDataSecond)).toThrow(
    'Pass only number',
  );
  // @ts-expect-error
  expect(() => calculateTotal(products, cacheDataThird)).toThrow(
    'Data type mismatch',
  );
  // @ts-expect-error
  expect(() => calculateTotal(5, undefined)).toThrow('Pass only object');
});

test('add the Object from cache data', () => {
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

  expect(countCartItems(cacheDataFirst)).toBe(9);
  expect(countCartItems(cacheDataSecond)).toBe(6);
  expect(countCartItems(cacheDataThird)).toBe(0);
});

test('add products and inside of cart ', () => {
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
  // @ts-expect-error
  expect(() => countCartItems(cacheDataFirst)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => countCartItems(cacheDataSecond)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => countCartItems(5)).toThrow('Pass only object');
});
