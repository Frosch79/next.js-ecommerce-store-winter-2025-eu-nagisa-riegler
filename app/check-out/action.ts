'use server';
import { cookies } from 'next/headers';
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
