'use server';
import { cookies } from 'next/headers';
import { getCookies } from '../../../util/cookies';
import { perseJson } from '../../../util/json';

export async function checkCookies() {
  const cookie = await getCookies('cart');

  const perseStoreCookie =
    typeof cookie === 'undefined' ? [] : perseJson(cookie) || [];
  return perseStoreCookie;
}

export async function removeCookie(id: number) {
  const cookie = await getCookies('cart');

  const parseCookie =
    typeof cookie === 'undefined' ? [] : perseJson(cookie) || [];
  const findData = parseCookie.find((obj) => obj.id === id);

  if (!findData) return undefined;

  const findDeleteCookieIndex = parseCookie.indexOf(findData);

  if (findDeleteCookieIndex !== -1) {
    parseCookie.splice(findDeleteCookieIndex, 1);
  }

  (await cookies()).set('cart', JSON.stringify(parseCookie));
}
