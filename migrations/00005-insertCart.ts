import type { Sql } from 'postgres';

const cartInside = [
  {
    id: 1,
    userId: 1,
    date: new Date('2025-08-29'),
  },
  {
    id: 2,
    userId: 1,
    date: new Date('2025-08-29'),
  },
  {
    id: 3,
    userId: 2,
    date: new Date('2025-08-25'),
  },
  {
    id: 4,
    userId: 3,
    date: new Date('2025-08-29'),
  },
  {
    id: 5,
    userId: 4,
    date: new Date('2025-08-29'),
  },
];

export async function up(sql: Sql) {
  for (const cart of cartInside) {
    await sql`INSERT INTO
  cart(
    user_id,
    date
  )
  VALUES
  (${cart.userId}, ${cart.date})`;
  }
}

export async function down(sql: Sql) {
  for (const cart of cartInside) {
    await sql`DELETE FROM cart
    WHERE id = ${cart.id} `;
  }
}
