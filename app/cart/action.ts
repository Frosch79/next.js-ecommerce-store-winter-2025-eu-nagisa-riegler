'use server';

import { cookies } from 'next/headers';
import { testRemoveCookie } from '../../util/testCookiesData';
import type { ProductCount } from '../products/[productId]/action';

export async function changeProductCookie(
  cartItems: ProductCount[],
  removeId: number,
) {
  const testedCookie = testRemoveCookie(cartItems, removeId);
  (await cookies()).set('cart', JSON.stringify(testedCookie));
  return testedCookie;
}
