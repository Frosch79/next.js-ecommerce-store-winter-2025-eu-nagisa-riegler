import { expect, test } from '@jest/globals';
import { createCookie } from '../createCookie';

const cartDataToCookieFirst = [
  { id: 3, count: 6 },
  { id: 3, count: 1 },
  { id: 1, count: 2 },
  { id: 4, count: 1 },
];

const cartDataToCookieSecond = [
  { id: 2, count: 2 },
  { id: 2, count: 1 },
  { id: 1, count: 2 },
  { id: 1, count: 1 },
  { id: 5, count: 6 },
  { id: 5, count: 6 },
];
const resultCookieFirst = [
  { id: 3, count: 7 },
  { id: 1, count: 2 },
  { id: 4, count: 1 },
];

const resultCookieSecond = [
  { id: 2, count: 3 },
  { id: 1, count: 3 },
  { id: 5, count: 12 },
];

test('create cookie test', () => {
  expect(createCookie(cartDataToCookieFirst)).toStrictEqual(resultCookieFirst);
  expect(createCookie(cartDataToCookieSecond)).toStrictEqual(
    resultCookieSecond,
  );
});

test('throws an error when dates is invalid', () => {
  // @ts-expect-error Test for invalid parameter types.
  expect(() => createCookie(true)).toThrow('Pass only Objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => createCookie(undefined)).toThrow('Pass only Objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => createCookie('date')).toThrow('Pass only Objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => createCookie([{ id: 'one', count: true }])).toThrow(
    'Object value must be number',
  );
});
