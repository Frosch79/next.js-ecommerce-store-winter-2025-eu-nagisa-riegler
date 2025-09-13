import { expect, test } from '@jest/globals';
import { calculateTotal, cartCounter } from '../cartSum';

test('add products and inside of cart ', () => {
  const product = [
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

  const cashData1 = [
    { id: 1, count: 3 },
    { id: 3, count: 5 },
    { id: 4, count: 1 },
  ];

  const cashData2 = [
    { id: 5, count: 2 },
    { id: 1, count: 3 },
    { id: 3, count: 1 },
  ];
  const cashData3: any[] = [];

  expect(calculateTotal(product, cashData1)).toBe(1540);
  expect(calculateTotal(product, cashData2)).toBe(1703);
  expect(calculateTotal(product, cashData3)).toBe(0);
});

test('add products and inside of cart ', () => {
  const product = [
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

  const cashData1 = [
    { id: '', count: true },
    { id: 9, count: 'five' },
    { id: null, count: 1 },
  ];

  const cashData2 = [
    { id: false, count: 2 },
    { id: 'cat', count: 5 },
    { id: 3, count: undefined },
  ];
  // @ts-expect-error
  expect(() => calculateTotal(product, cashData1)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => calculateTotal(product, cashData2)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => calculateTotal(5, undefined)).toThrow('Pass only Object');
});

test('add the Object from cash data', () => {
  const cashData1 = [
    { id: 1, count: 3 },
    { id: 3, count: 5 },
    { id: 4, count: 1 },
  ];

  const cashData2 = [
    { id: 5, count: 2 },
    { id: 1, count: 3 },
    { id: 3, count: 1 },
  ];
  const cashData3: any[] = [];

  expect(cartCounter(cashData1)).toBe(9);
  expect(cartCounter(cashData2)).toBe(6);
  expect(cartCounter(cashData3)).toBe(0);
});

test('add products and inside of cart ', () => {
  const cashData1 = [
    { id: '', count: true },
    { id: 9, count: 'five' },
    { id: null, count: 1 },
  ];

  const cashData2 = [
    { id: false, count: 2 },
    { id: 'cat', count: 5 },
    { id: 3, count: undefined },
  ];
  // @ts-expect-error
  expect(() => cartCounter(cashData1)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => cartCounter(cashData2)).toThrow('Pass only number');
  // @ts-expect-error
  expect(() => cartCounter(5)).toThrow('Pass only Object');
});
