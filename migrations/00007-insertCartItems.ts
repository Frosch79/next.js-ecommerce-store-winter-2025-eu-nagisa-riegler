import type { Sql } from 'postgres';

const cartItem = [
  {
    id: 1,
    cartId: 4,
    productId: 3,
    quantity: 5,
  },
  {
    id: 2,
    cartId: 4,
    productId: 2,
    quantity: 6,
  },
  {
    id: 3,
    cartId: 3,
    productId: 1,
    quantity: 3,
  },
  {
    id: 4,
    cartId: 4,
    productId: 4,
    quantity: 1,
  },
  {
    id: 5,
    cartId: 3,
    productId: 5,
    quantity: 3,
  },
];

export async function up(sql: Sql) {
  for (const cart of cartItem) {
    await sql`INSERT INTO
  cart_item(
cart_id,
    products_id,
    quantity

  )
  VALUES
  (${cart.cartId}, ${cart.productId},${cart.quantity})`;
  }
}

export async function down(sql: Sql) {
  for (const cart of cartItem) {
    await sql`DELETE FROM cart_item
    WHERE id = ${cart.id} `;
  }
}
