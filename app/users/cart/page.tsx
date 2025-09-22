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
