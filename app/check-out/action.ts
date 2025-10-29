'use server';
import { cookies } from 'next/headers';

export async function deleteProductCookies() {
  (await cookies()).delete('cart');
}
