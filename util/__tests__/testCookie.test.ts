import { expect, test } from '@jest/globals';
import { testCookie, testRemoveCookie } from '../testCookie';

const prevCookiesFirst = [
  { id: 3, count: 7 },
  { id: 1, count: 2 },
  { id: 4, count: 1 },
];

const prevCookiesSecond = [
  { id: 2, count: 3 },
  { id: 1, count: 3 },
  { id: 5, count: 6 },
];

const newCookiesFirst = { id: 5, count: 6 };

const newCookiesSecond = { id: 2, count: 2 };

const resultCookieFirst = [
  { id: 3, count: 7 },
  { id: 1, count: 2 },
  { id: 4, count: 1 },
  { id: 5, count: 6 },
];

const resultCookieSecond = [
  { id: 2, count: 5 },
  { id: 1, count: 3 },
  { id: 5, count: 6 },
];

const resultCookieThird = [
  { id: 3, count: 7 },
  { id: 4, count: 1 },
  { id: 5, count: 6 },
];

const resultCookieFourth = [
  { id: 2, count: 5 },
  { id: 1, count: 3 },
];

test('create cookie test', () => {
  expect(testCookie(prevCookiesFirst, newCookiesFirst)).toStrictEqual(
    resultCookieFirst,
  );
  expect(testCookie(prevCookiesSecond, newCookiesSecond)).toStrictEqual(
    resultCookieSecond,
  );
});

const errorTestFirst = [{ id: '5', count: true }];
const errorTestSecond = { id: 'two', count: undefined };
test('throws an error when dates is invalid', () => {
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testCookie(true, 'string')).toThrow('Pass only objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testCookie(undefined, 5)).toThrow('Pass only objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testCookie('date', 4)).toThrow('Pass only objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testCookie([{ id: 'one', count: true }], 3)).toThrow(
    'Pass only objects',
  );
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testCookie(errorTestFirst, errorTestSecond)).toThrow(
    'Pass only number',
  );
});

test('remove cookie test', () => {
  expect(testRemoveCookie(prevCookiesFirst, 1)).toStrictEqual(
    resultCookieThird,
  );
  expect(testRemoveCookie(prevCookiesSecond, 5)).toStrictEqual(
    resultCookieFourth,
  );
});

test('throws an error when dates is invalid', () => {
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testRemoveCookie(prevCookiesFirst, 'number')).toThrow(
    'Pass only number',
  );
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testRemoveCookie(undefined, 5)).toThrow('Pass only objects');
  // @ts-expect-error Test for invalid parameter types.
  expect(() => testRemoveCookie(errorTestFirst, 'number')).toThrow(
    'Pass only number',
  );
});
