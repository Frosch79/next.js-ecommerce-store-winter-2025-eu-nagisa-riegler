import { cache } from 'react';
import type { Product } from '../migrations/00002-createTableProducts';
import { sql } from './connect';

export const getProductsInsecure = cache(async () => {
  const product = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
  return product;
});

export const getProductInsecure = cache(async (id: number) => {
  const product = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product[0];
});
