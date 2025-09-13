import { NextResponse } from 'next/server';
import { getUserCartItemsInsecure } from '../../../../../../../../database/users';
import type { CartItem } from '../../../../../../../../migrations/00006-createTableCartItems';

type CartItemResponseBodyGet = { cart: CartItem[] } | { error: string };
type CartItemParams = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: CartItemParams,
): Promise<NextResponse<CartItemResponseBodyGet>> {
  const cartItem = await getUserCartItemsInsecure(
    Number((await params).itemId),
  );
  if (typeof cartItem === 'undefined') {
    return NextResponse.json(
      { error: 'CartItem does not exist' },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json({ cart: cartItem });
}
