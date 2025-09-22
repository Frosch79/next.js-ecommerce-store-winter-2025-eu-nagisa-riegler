'use server';
import { cookies } from 'next/headers';
import { getProductsInsecure } from '../../database/users';
import { getCookies } from '../../util/cookies';
import { perseJson } from '../../util/json';
import type { ProductCount } from '../products/[productId]/action';

export async function checkCookies() {
  const cookie = await getCookies('cart');

  const perseStoreCookie =
    typeof cookie === 'undefined' ? [] : perseJson(cookie) || [];
  return perseStoreCookie;
}
export async function deleteProductCookies() {
  (await cookies()).delete('cart');
}

export async function removeProductCookies(newCookie: ProductCount[]) {
  (await cookies()).set('cart', JSON.stringify(newCookie));
}

export async function checkOutProducts() {
  const cookieData = await checkCookies();
  const products = await getProductsInsecure();
  const total = cookieData.reduce((sum, value) => {
    const findProduct = products.find((obj) => obj.id === value.id);

    if (!findProduct) return 0;

    return sum + findProduct.price * value.count;
  }, 0);

  return total;
}
