import { NextResponse } from 'next/server';
import { getUserCartInsecure } from '../../../../../../database/users';
import type { Cart } from '../../../../../../migrations/00004-createTableCart';

type CartItemResponseBodyGet = { cart: Cart[] } | { error: string };
type CartItemParams = {
  params: Promise<{
    cartId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: CartItemParams,
): Promise<NextResponse<CartItemResponseBodyGet>> {
  const cartItem = await getUserCartInsecure(Number((await params).cartId));
  if (!cartItem) {
    return NextResponse.json(
      { error: 'CartItem does not exist' },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json({ cart: cartItem });
}
