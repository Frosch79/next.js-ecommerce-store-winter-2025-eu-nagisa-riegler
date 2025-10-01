'use server';
import { cookies } from 'next/headers';
import type { ProductCount } from '../products/[productId]/action';

export async function deleteProductCookies() {
  (await cookies()).delete('cart');
}

export async function removeProductCookies(newCookie: ProductCount[]) {
  (await cookies()).set('cart', JSON.stringify(newCookie));
}
