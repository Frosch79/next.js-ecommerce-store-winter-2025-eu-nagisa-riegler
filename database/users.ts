import { cache } from 'react';
import type { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

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
