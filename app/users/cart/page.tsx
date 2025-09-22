import { callProductToCart, getProductCookies } from './action';
import CartList from './CartList';
import CheckOutButton from './CheckOutButton';
import style from './page.module.scss';

export const metadata = {
  title: 'Cart',
  descriptions: 'Your cart',
};
const items = async () => await callProductToCart();
const products = async () => await getProductCookies();
export default function CartPage() {
  const callItems = items;
  const productCookies = products;
  return (
    <div className={style.cartItems}>
      <h1>cart</h1>
      <CartList callItems={callItems()} productCookies={productCookies()} />
      <CheckOutButton />

      {/* list of added products */}
    </div>
  );
}
