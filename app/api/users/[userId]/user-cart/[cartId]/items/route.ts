import { NextResponse } from 'next/server';
import { createUserCartItemsInsecure } from '../../../../../../../database/users';
import {
  type CartItem,
  itemSchema,
} from '../../../../../../../migrations/00006-createTableCartItems';

export type ItemResponseBodyPost = { item: CartItem[] } | { error: string };

export async function POST(
  request: Request,
): Promise<NextResponse<ItemResponseBodyPost>> {
  const requestBody = await request.json();
  const result = itemSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain cart object' },
      {
        status: 404,
      },
    );
  }

  const newItem = await createUserCartItemsInsecure({
    cartId: result.data.cartId,
    productsId: result.data.productsId,
    quantity: result.data.quantity,
  });

  if (typeof newItem === 'undefined') {
    return NextResponse.json(
      { error: 'User not created or access denied creating user' },
      {
        status: 500,
      },
    );
  }
  return NextResponse.json({ item: newItem });
}
