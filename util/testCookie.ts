import type { ProductCount } from '../app/products/[productId]/action';

export function testCookie(
  prevCookies: ProductCount[],
  newCookies: ProductCount,
) {
  if (typeof prevCookies !== 'object' || typeof newCookies !== 'object') {
    throw Error('Pass only objects');
  }
  if (
    typeof newCookies.count !== 'number' ||
    typeof newCookies.id !== 'number'
  ) {
    throw Error('Pass only number');
  }
  const testedCookie = prevCookies;

  const findCookie = testedCookie.find((obj) => {
    if (typeof obj.id !== 'number' || typeof obj.count !== 'number') {
      throw Error('Pass only number');
    }
    return obj.id === newCookies.id;
  });

  if (!findCookie) {
    testedCookie.push({ id: newCookies.id, count: newCookies.count });
  } else {
    findCookie.count += newCookies.count;
  }

  return testedCookie;
}

export function testRemoveCookie(cartItems: ProductCount[], id: number) {
  if (typeof cartItems !== 'object') {
    throw Error('Pass only objects');
  }
  const newItems = cartItems.filter((item) => {
    if (
      typeof item.id !== 'number' ||
      typeof item.count !== 'number' ||
      typeof id !== 'number'
    ) {
      throw Error('Pass only number');
    }
    return id !== item.id;
  });

  return newItems;
}
