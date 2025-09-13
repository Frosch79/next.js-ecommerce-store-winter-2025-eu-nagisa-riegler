import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import type { Product } from '../migrations/00002-createTableProducts';
import type { Cart, UserCart } from '../migrations/00004-createTableCart';
import type {
  CartItem,
  UserItems,
} from '../migrations/00006-createTableCartItems';
import { sql } from './connect';

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
  SELECT * FROM users`;
  return users[0];
});
export const getUserInsecure = cache(async (id: number) => {
  const users = await sql<User[]>`
  SELECT * FROM users WHERE id = ${id}`;
  return users[0];
});

export const createUserInsecure = cache(async (newUser: Omit<User, 'id'>) => {
  const users = await sql<User[]>`
    INSERT INTO
    users(
  first_name,
  last_name,
  email
  )VALUES(
            ${newUser.firstName},
            ${newUser.lastName},
            ${newUser.email})
    RETURNING users.*`;
  return users[0];
});

export const updateUserInsecure = cache(async (updateUser: User) => {
  const users = await sql<User[]>`UPDATE users
     SET
      first_name = ${updateUser.firstName},
      last_name = ${updateUser.lastName},
      email = ${updateUser.email}

        WHERE id = ${updateUser.id}

    RETURNING users.*`;
  return users[0];
});

export const deleteUserInsecure = cache(
  async (deleteUser: Pick<User, 'id'>) => {
    const users = await sql<User[]>`
 DELETE FROM users
      WHERE
       id = ${deleteUser.id}
    RETURNING users.*`;
    return users[0];
  },
);

export const createUserCartInsecure = cache(
  async (newCart: Omit<Cart, 'id'>) => {
    const setCart = await sql<Cart[]>`
  INSERT INTO cart(user_id,date)
  VALUES
  (${newCart.userId},${newCart.date})
  RETURNING cart.*`;
    return setCart[0];
  },
);

export const getUserCartInsecure = cache(async (id: number) => {
  const userCart = await sql<UserItems[]>`
  SELECT cart.*, coalesce(json_agg(cart_item.*) FILTER(WHERE cart_item.cart_id IS NOT NULL),'[]') AS user_items

   FROM cart

   LEFT JOIN cart_item ON  cart.id = cart_item.cart_id
     WHERE cart.id=${id}
     GROUP BY cart.id
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

  coalesce(json_agg(cart.*)  FILTER(
   WHERE cart.user_id IS NOT NULL)
  ,'[]') AS user_cart,
  coalesce(json_agg(cart_item.*)  FILTER(
    WHERE cart_item.id  IS NOT NULL)
  ,'[]') AS user_items


  FROM users
  LEFT JOIN cart ON users.id = cart.user_id
  LEFT JOIN cart_item ON cart.id = cart_item.cart_id


  WHERE users.id =${id}
  GROUP BY
    users.id,
    users.first_name,
    users.last_name,
    users.email

  `;

  return cart;
});

export const getProductsInsecure = cache(async () => {
  const product = await sql<Product[]>`
  SELECT * FROM products
  `;
  return product;
});

export const getProductInsecure = cache(async (id: number) => {
  const product = await sql<Product[]>`
  SELECT * FROM products WHERE id=${id}
  `;
  return product[0];
});

export const getAllCartItemsInsecure = cache(async () => {
  const items = await sql<CartItem[]>`
  SELECT *
  FROM cart_item
  `;
  return items;
});

export const createUserCartItemsInsecure = cache(
  async (newItems: Omit<CartItem, 'id'>) => {
    const items = await sql<CartItem[]>`
  INSERT INTO cart_item(cart_id,products_id,quantity)
  VALUES
  (${newItems.cartId},${newItems.productsId},${newItems.quantity})
  RETURNING cart_item.*`;
    return items;
  },
);

export const getUserCartItemsInsecure = cache(async (id: number) => {
  const items = await sql<CartItem[]>`
  SELECT *
FROM cart_item
WHERE id =${id}
  `;
  return items;
});

export const updateUserCartItemsInsecure = cache(
  async (updateItem: CartItem) => {
    const items = await sql<CartItem[]>`UPDATE cart_item
     SET
      products_id = ${updateItem.productsId},
      quantity = ${updateItem.quantity}


      WHERE id = ${updateItem.id} AND  cart_id= ${updateItem.cartId}
    RETURNING cart_item.*`;
    return items[0];
  },
);

export const deleteUserCartItemInsecure = cache(
  async (deleteItem: Pick<CartItem, 'id'>) => {
    const item = await sql<CartItem[]>`
 DELETE FROM cart_item
 WHERE id = ${deleteItem.id}
    RETURNING cart_item.*`;
    return item[0];
  },
);
