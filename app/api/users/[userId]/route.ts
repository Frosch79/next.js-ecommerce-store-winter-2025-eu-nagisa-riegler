import { NextResponse } from 'next/server';
import { getUsersCartInsecure } from '../../../../database/cart';
import type { UserCart } from '../../../../migrations/00004-createTableCart';

type UserResponseBodyGet = { user: UserCart } | { error: string };
type UserParams = { params: Promise<{ userId: string }> };

// get all user data
export async function GET(
  request: Request,
  { params }: UserParams,
): Promise<NextResponse<UserResponseBodyGet>> {
  const user = await getUsersCartInsecure(Number((await params).userId));
  if (!user) {
    return NextResponse.json(
      { error: 'User does not exist' },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json({ user: user });
}
