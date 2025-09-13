import type { ProductCount } from '../app/products/[productId]/action';
import type { Products } from '../database/products';

// CartList
export function calculateTotal(objA: Products[], objB: ProductCount[]) {
  if (typeof objA !== 'object' || typeof objB !== 'object') {
    throw new Error('Pass only Object');
  }
  if (objB.length === 0) return 0;
  const total = objB.reduce((sum: number, product: ProductCount) => {
    if (typeof product.id !== 'number' || typeof product.count !== 'number') {
      throw new Error('Pass only number');
    }

    const findProduct = objA.find((obj) => obj.id === product.id);

    if (!findProduct) return 0;

    return sum + findProduct.price * product.count;
  }, 0);

  return total;
}

// Layout
export function cartCounter(data: ProductCount[]) {
  if (typeof data !== 'object') {
    throw new Error('Pass only Object');
  }
  const totalCart =
    data.length <= 0
      ? 0
      : data.reduce((sum, value) => {
          if (typeof value.count !== 'number' || typeof value.id !== 'number') {
            throw new Error('Pass only number');
          }
          return sum + value.count;
        }, 0);

  return totalCart;
}
