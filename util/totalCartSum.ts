import type { ProductCount } from '../app/products/[productId]/action';
import type { Product } from '../migrations/00002-createTableProducts';

// CartList
export function calculateTotal(products: Product[], cookies: ProductCount[]) {
  if (!(cookies instanceof Object) || !(products instanceof Object)) {
    throw new Error('Pass only object');
  }
  const cartProducts = products;
  const cookie = cookies;

  if (cookie.length === 0) return 0;

  const total = cookie.reduce((sum: number, item: ProductCount): number => {
    if (typeof item.id !== 'number' || typeof item.count !== 'number') {
      throw new Error('Pass only number');
    }
    const findItem = cartProducts.find((product: Product) => {
      if (
        typeof product.id !== 'number' ||
        typeof product.price !== 'number' ||
        typeof product.productName !== 'string'
      ) {
        throw new Error('Data type mismatch');
      }
      return product.id === item.id;
    });
    if (!findItem) return 0;

    return sum + findItem.price * item.count;
  }, 0);
  return total;
}

// Layout
export function countCartItems(cookies: ProductCount[]) {
  if (!(cookies instanceof Object)) {
    throw new Error('Pass only object');
  }
  const totalCart =
    cookies.length <= 0
      ? 0
      : cookies.reduce((sum, value) => {
          if (typeof value.count !== 'number' || typeof value.id !== 'number') {
            throw new Error('Pass only number');
          }
          return sum + value.count;
        }, 0);

  return totalCart;
}
