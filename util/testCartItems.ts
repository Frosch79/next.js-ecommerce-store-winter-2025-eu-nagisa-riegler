import type { ProductCount } from '../app/products/[productId]/action';
import type { Product } from '../migrations/00002-createTableProducts';

export function testCartItems(cookies: ProductCount[], products: Product[]) {
  if (!(cookies instanceof Object) || !(products instanceof Object)) {
    throw new Error('Pass only object');
  }
  const cartProducts = products;
  const cookie = cookies;

  const cartItems = cookie.map((item) => {
    if (typeof item.id !== 'number' || typeof item.count !== 'number') {
      throw new Error('Pass only number');
    }

    const findItem = cartProducts.find((product) => item.id === product.id);
    if (!findItem) throw new Error('Product not found');

    return {
      id: findItem.id,
      price: findItem.price,
      productName: findItem.productName,
      count: item.count,
    };
  });

  return cartItems;
}
