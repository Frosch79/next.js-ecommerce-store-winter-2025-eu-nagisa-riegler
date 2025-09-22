import type { Product } from '../../../migrations/00002-createTableProducts';
import type { ProductCount } from '../../products/[productId]/action';
import { callProductToCart, getProductCookies } from './action';
import CartList from './CartList';
import CheckOutButton from './CheckOutButton';
import style from './page.module.scss';

export const metadata = {
  title: 'Cart',
  descriptions: 'Your cart',
};

export default function CartPage() {
  return (
    <div className={style.cartItems}>
      <h1>cart</h1>
      <CartList />
      <CheckOutButton />

      {/* list of added products */}
    </div>
  );
}
