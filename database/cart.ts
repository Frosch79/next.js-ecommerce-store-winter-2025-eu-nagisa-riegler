import { cache } from 'react';
import type { Cart, UserCart } from '../migrations/00004-createTableCart';
import type { UserItems } from '../migrations/00006-createTableCartItems';
import { sql } from './connect';

export const createUserCartInsecure = cache(
  async (newCart: Omit<Cart, 'id'>) => {
    const setCart = await sql<Cart[]>`
      INSERT INTO
        cart (user_id, date)
      VALUES
        (
          ${newCart.userId},
          ${newCart.date}
        )
      RETURNING
        cart.*
    `;
    return setCart[0];
  },
);

export const getUserCartInsecure = cache(async (id: number) => {
  const userCart = await sql<UserItems[]>`
    SELECT
      cart.*,
      coalesce(
        json_agg(cart_item.*) FILTER (
          WHERE
            cart_item.cart_id IS NOT NULL
        ),
        '[]'
      ) AS user_items
    FROM
      cart
      LEFT JOIN cart_item ON cart.id = cart_item.cart_id
    WHERE
      cart.id = ${id}
    GROUP BY
      cart.id
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
        json_agg(cart.*) FILTER (
          WHERE
            cart.user_id IS NOT NULL
        ),
        '[]'
      ) AS user_cart,
      coalesce(
        json_agg(cart_item.*) FILTER (
          WHERE
            cart_item.id IS NOT NULL
        ),
        '[]'
      ) AS user_items
    FROM
      users
      LEFT JOIN cart ON users.id = cart.user_id
      LEFT JOIN cart_item ON cart.id = cart_item.cart_id
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
