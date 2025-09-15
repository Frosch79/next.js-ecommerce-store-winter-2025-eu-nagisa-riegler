import type { Sql } from 'postgres';
import z from 'zod';

export type Cart = {
  id: number;
  userId: number;
  date: Date;
};

export type UserCart = {
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userCart: { id: number | null; user_id: number | null; date: Date | null }[];
  userItems: {
    id: number | null;
    cart_id: number | null;
    products_id: number | null;
    quantity: number | null;
  }[];
};

export const cartSchema = z.object({
  userId: z.number(),
  date: z.coerce.date(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE cart (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      date date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE cart`;
}
