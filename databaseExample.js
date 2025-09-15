import postgres from 'postgres';
import { setEnvironmentVariables } from './util/config';

setEnvironmentVariables();

const sql = postgres();

console.log(
  await sql`
    SELECT
      *
    FROM
      products
  `,
);

await sql.end();
