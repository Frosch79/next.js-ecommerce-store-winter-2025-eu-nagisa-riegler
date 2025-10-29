import { cache } from 'react';
import type { CartItem } from '../migrations/00006-createTableCartItems';
import { sql } from './connect';

export const createUserCartItemsInsecure = cache(
  async (newItems: Omit<CartItem, 'id'>) => {
    const items = await sql<CartItem[]>`
      INSERT INTO
        cart_items (
          cart_id,
          products_id,
          quantity
        )
      VALUES
        (
          ${newItems.cartId},
          ${newItems.productsId},
          ${newItems.quantity}
        )
      RETURNING
        cart_items.*
    `;
    return items;
  },
);

export const getUserCartItemsInsecure = cache(async (id: number) => {
  const items = await sql<CartItem[]>`
    SELECT
      *
    FROM
      cart_items
    WHERE
      id = ${id}
  `;
  return items;
});
