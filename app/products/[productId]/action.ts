'use server';
import { cookies } from 'next/headers';
import { getCookies } from '../../../util/cookies';
import { perseJson } from '../../../util/json';
import { testCookie } from '../../../util/testCookiesData';

export type ProductCount = {
  id: number;
  count: number;
};

export async function createCookie(productCount: ProductCount) {
  const cookie = await getCookies('cart');

  let testStoreCookie = !cookie ? [] : perseJson(cookie);
  if (!Array.isArray(testStoreCookie)) {
    testStoreCookie = [];
  }

  const testedCookie = testCookie(testStoreCookie, productCount);
  (await cookies()).set('cart', JSON.stringify(testedCookie));
}
