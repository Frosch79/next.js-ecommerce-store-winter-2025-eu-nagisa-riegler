import { NextResponse } from 'next/server';
import { createUserInsecure } from '../../../database/users';
import {
  inputUserSchema,
  type User,
} from '../../../migrations/00000-createTableUsers';

export type UserResponseBodyPost = { user: User } | { error: string };

// create user
export async function POST(
  request: Request,
): Promise<NextResponse<UserResponseBodyPost>> {
  const requestBody = await request.json();
  const result = inputUserSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain user object' },
      {
        status: 404,
      },
    );
  }

  const newUser = await createUserInsecure({
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    email: result.data.email,
  });

  if (!newUser) {
    return NextResponse.json(
      { error: 'User not created or access denied creating user' },
      {
        status: 500,
      },
    );
  }
  return NextResponse.json({ user: newUser });
}
