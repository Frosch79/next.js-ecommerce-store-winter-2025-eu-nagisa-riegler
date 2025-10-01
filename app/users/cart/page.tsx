import { getProductsInsecure } from '../../../database/products';
import { getCookies } from '../../../util/cookies';
import { perseJson } from '../../../util/json';
import CartList from './CartList';
import CheckOutButton from './CheckOutButton';
import style from './page.module.scss';

export const metadata = {
  title: 'Cart',
  descriptions: 'Your cart',
};

export default async function CartPage() {
  const cartProducts = await getProductsInsecure();
  const cookie = await getCookies('cart');
  let perseStoreCookie =
    typeof cookie === 'undefined' ? [] : perseJson(cookie) || [];

  if (!Array.isArray(perseStoreCookie)) {
    perseStoreCookie = [];
  }

  const itemList = [];
  for (const item of perseStoreCookie) {
    const product = cartProducts.find((data) => data.id === item.id);
    if (product) itemList.push(product);
  }

  return (
    <div className={style.cartItems}>
      <h1>cart</h1>
      <CartList callItems={itemList} productCookies={perseStoreCookie} />
      <CheckOutButton />

      {/* list of added products */}
    </div>
  );
}
