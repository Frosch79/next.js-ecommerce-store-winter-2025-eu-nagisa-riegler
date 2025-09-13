'use server';
import { cookies } from 'next/headers';
import { getCookies } from '../../../util/cookies';
import { perseJson } from '../../../util/json';

export type ProductCount = {
  id: number;
  count: number;
};

export async function createCookie(
  productCount: ProductCount,
  objName: string,
) {
  const cookie = await getCookies(objName);

  const testStoreCookie = !cookie ? [] : perseJson(cookie);
  if (!testStoreCookie) return undefined;
  const findCookie = testStoreCookie.find((obj) => obj.id === productCount.id);

  if (!findCookie) {
    testStoreCookie.push({ id: productCount.id, count: productCount.count });
  } else {
    findCookie.count += productCount.count;
  }
  (await cookies()).set(objName, JSON.stringify(testStoreCookie));
}
