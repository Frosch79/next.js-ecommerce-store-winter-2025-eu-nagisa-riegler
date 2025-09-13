import type { Sql } from 'postgres';
import z from 'zod';

export type CartItem = {
  id: number;
  cartId: number;
  productsId: number;
  quantity: number;
};

export type UserItems = {
  id: number;
  userId: number;
  date: Date;
  userItems: {
    id: number | null;
    cart_id: number | null;
    products_id: number | null;
    quantity: number | null;
  }[];
};

export const itemSchema = z.object({
  cartId: z.number(),
  productsId: z.number(),
  quantity: z.number(),
});

export async function up(sql: Sql) {
  await sql` CREATE TABLE cart_item(
     id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 cart_id integer NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
 products_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL
)`;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE cart_item`;
}
