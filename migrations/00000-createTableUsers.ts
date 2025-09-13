import type { Sql } from 'postgres';
import z from 'zod';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const userSchema = z.object({
  user: z.string(),
});

export const inputUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      email varchar(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
