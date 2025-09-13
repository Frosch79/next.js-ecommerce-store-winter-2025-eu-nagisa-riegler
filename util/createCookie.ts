import type { ProductCount } from '../app/products/[productId]/action';

export function createCookie(productCount: ProductCount[]) {
  if (!(productCount instanceof Object)) {
    throw Error('Pass only Objects');
  }
  const testStoreCookie: { id: number; count: number }[] = [];
  for (const product of productCount) {
    if (typeof product.id !== 'number' || typeof product.count !== 'number') {
      throw Error('Object value must be number');
    }
    const findCookie = testStoreCookie.find((obj) => obj.id === product.id);

    if (!findCookie) {
      testStoreCookie.push({ id: product.id, count: product.count });
    } else {
      findCookie.count += product.count;
    }
  }

  return testStoreCookie;
}
