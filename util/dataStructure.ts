export function allUserData(
  userCart: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    cartId: number;
    date: Date;
    userItemId: number;
    productId: number;
    quantity: number;
  }[],
) {
  const user = userCart[0];

  if (!user) {
    throw new Error('No user found!');
  }
  const userData = {
    id: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userCart: userCart.map((cart) => {
      return {
        id: cart.cartId,
        userId: cart.userId,
        date: cart.date,
      };
    }),
    userItem: userCart.map((item) => {
      return {
        id: item.userItemId,
        productId: item.productId,
        cartId: item.cartId,
        quantity: item.quantity,
      };
    }),
  };

  return userData;
}

export function userShoppingCart(
  itemData: {
    id: number;
    userId: number;
    date: Date;
    itemId: number;
    cartId: number;
    productId: number;
    quantity: number;
  }[],
) {
  const cart = itemData[0];

  if (!cart) {
    throw new Error('No user found!');
  }

  const cartInside = {
    id: cart.id,
    userId: cart.userId,
    date: cart.date,
    userItem: itemData.map((item) => {
      return {
        id: item.itemId,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
      };
    }),
  };
  return cartInside;
}
