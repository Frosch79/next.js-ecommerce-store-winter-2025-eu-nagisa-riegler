import { cache } from 'react';
import type { CartItem } from '../migrations/00006-createTableCartItems';
import { sql } from './connect';

export const getAllCartItemsInsecure = cache(async () => {
  const items = await sql<CartItem[]>`
    SELECT
      *
    FROM
      cart_item
  `;
  return items;
});

export const createUserCartItemsInsecure = cache(
  async (newItems: Omit<CartItem, 'id'>) => {
    const items = await sql<CartItem[]>`
      INSERT INTO
        cart_item (
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
        cart_item.*
    `;
    return items;
  },
);

export const getUserCartItemsInsecure = cache(async (id: number) => {
  const items = await sql<CartItem[]>`
    SELECT
      *
    FROM
      cart_item
    WHERE
      id = ${id}
  `;
  return items;
});

export const updateUserCartItemsInsecure = cache(
  async (updateItem: CartItem) => {
    const items = await sql<CartItem[]>`
      UPDATE cart_item
      SET
        products_id = ${updateItem.productsId},
        quantity = ${updateItem.quantity}
      WHERE
        id = ${updateItem.id}
        AND cart_id = ${updateItem.cartId}
      RETURNING
        cart_item.*
    `;
    return items[0];
  },
);

export const deleteUserCartItemInsecure = cache(
  async (deleteItem: Pick<CartItem, 'id'>) => {
    const item = await sql<CartItem[]>`
      DELETE FROM cart_item
      WHERE
        id = ${deleteItem.id}
      RETURNING
        cart_item.*
    `;
    return item[0];
  },
);
