import { cache } from 'react';
import type { Cart, UserCart } from '../migrations/00004-createTableCarts';
import type { UserItems } from '../migrations/00006-createTableCartItems';
import { sql } from './connect';

export const createUserCartInsecure = cache(
  async (newCart: Omit<Cart, 'id'>) => {
    const setCart = await sql<Cart[]>`
      INSERT INTO
        carts (user_id, date)
      VALUES
        (
          ${newCart.userId},
          ${newCart.date}
        )
      RETURNING
        carts.*
    `;
    return setCart[0];
  },
);

export const getUserCartInsecure = cache(async (id: number) => {
  const userCart = await sql<UserItems[]>`
    SELECT
      carts.*,
      coalesce(
        json_agg(cart_items.*) FILTER (
          WHERE
            cart_items.cart_id IS NOT NULL
        ),
        '[]'
      ) AS user_items
    FROM
      carts
      LEFT JOIN cart_items ON carts.id = cart_items.cart_id
    WHERE
      carts.id = ${id}
    GROUP BY
      carts.id
  `;
  return userCart;
});

export const getUsersCartInsecure = cache(async (id: number) => {
  const [cart] = await sql<UserCart[]>`
    SELECT
      users.id AS user_id,
      users.first_name AS user_first_name,
      users.last_name AS user_last_name,
      users.email AS user_email,
      coalesce(
        json_agg(carts.*) FILTER (
          WHERE
            carts.user_id IS NOT NULL
        ),
        '[]'
      ) AS user_cart,
      coalesce(
        json_agg(cart_items.*) FILTER (
          WHERE
            cart_items.id IS NOT NULL
        ),
        '[]'
      ) AS user_items
    FROM
      users
      LEFT JOIN carts ON users.id = carts.user_id
      LEFT JOIN cart_items ON carts.id = cart_items.cart_id
    WHERE
      users.id = ${id}
    GROUP BY
      users.id,
      users.first_name,
      users.last_name,
      users.email
  `;

  return cart;
});
