import { NextResponse } from 'next/server';
import { createUserCartInsecure } from '../../../../../database/cart';
import {
  type Cart,
  cartSchema,
} from '../../../../../migrations/00004-createTableCart';

export type CartResponseBodyPost = { cart: Cart } | { error: string };

export async function POST(
  request: Request,
): Promise<NextResponse<CartResponseBodyPost>> {
  const requestBody = await request.json();
  const result = cartSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain cart object' },
      {
        status: 404,
      },
    );
  }

  const newCart = await createUserCartInsecure({
    userId: result.data.userId,
    date: new Date(result.data.date),
  });

  if (!newCart) {
    return NextResponse.json(
      { error: 'User not created or access denied creating user' },
      {
        status: 500,
      },
    );
  }
  return NextResponse.json({ cart: newCart });
}
