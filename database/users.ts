import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  return users[0];
});
export const getUserInsecure = cache(async (id: number) => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users[0];
});

export const createUserInsecure = cache(async (newUser: Omit<User, 'id'>) => {
  const users = await sql<User[]>`
    INSERT INTO
      users (first_name, last_name, email)
    VALUES
      (
        ${newUser.firstName},
        ${newUser.lastName},
        ${newUser.email}
      )
    RETURNING
      users.*
  `;
  return users[0];
});

export const updateUserInsecure = cache(async (updateUser: User) => {
  const users = await sql<User[]>`
    UPDATE users
    SET
      first_name = ${updateUser.firstName},
      last_name = ${updateUser.lastName},
      email = ${updateUser.email}
    WHERE
      id = ${updateUser.id}
    RETURNING
      users.*
  `;
  return users[0];
});

export const deleteUserInsecure = cache(
  async (deleteUser: Pick<User, 'id'>) => {
    const users = await sql<User[]>`
      DELETE FROM users
      WHERE
        id = ${deleteUser.id}
      RETURNING
        users.*
    `;
    return users[0];
  },
);
