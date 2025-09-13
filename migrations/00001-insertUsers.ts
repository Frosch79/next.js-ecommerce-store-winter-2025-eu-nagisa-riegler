import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    firstName: 'haul',
    lastName: 'castle',
    email: 'sofy@gmail.com',
  },
  {
    id: 2,
    firstName: 'mei',
    lastName: 'satsuki',
    email: 'totoro@gmail.com',
  },
  {
    id: 3,
    firstName: 'jiji',
    lastName: 'kiki',
    email: 'kuroneko@gmail.com',
  },
  {
    id: 4,
    firstName: 'pazu',
    lastName: 'sheeta',
    email: 'laputa@gmail.com',
  },
  {
    id: 5,
    firstName: 'porco',
    lastName: 'rosso',
    email: 'pig@gmail.com',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`INSERT INTO
  users(
  first_name ,
  last_name ,
  email

  )
  VALUES
  (${user.firstName}, ${user.lastName},${user.email})`;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`DELETE FROM users
    WHERE id = ${user.id}`;
  }
}
