import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    productName: 'Cat-Walk',
    price: 500,
  },
  {
    id: 2,
    productName: 'Food',
    price: 15,
  },
  {
    id: 3,
    productName: 'Toy',
    price: 3,
  },
  {
    id: 4,
    productName: 'Toilet',
    price: 25,
  },
  {
    id: 5,
    productName: 'Sofa',
    price: 100,
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO
        products (product_name, price)
      VALUES
        (
          ${product.productName},
          ${product.price}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        id = ${product.id}
    `;
  }
}
