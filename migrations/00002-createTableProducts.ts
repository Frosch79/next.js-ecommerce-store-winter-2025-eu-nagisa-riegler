import type { Sql } from 'postgres';

export type Product = {
  id: number;
  productName: string;
  price: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      product_name varchar(30) NOT NULL,
      price integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products`;
}
