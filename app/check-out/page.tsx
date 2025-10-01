import { getProductsInsecure } from '../../database/products';
import { getCookies } from '../../util/cookies';
import { perseJson } from '../../util/json';
import InputForm from './InputForm';

export const metadata = {
  title: 'Check out',
  descriptions: 'confirm oder',
};

export default async function CheckOutPage() {
  const cookie = await getCookies('cart');

  const perseStoreCookie =
    typeof cookie === 'undefined' ? [] : perseJson(cookie) || [];

  const products = await getProductsInsecure();
  const total = perseStoreCookie.reduce((sum, value) => {
    const findProduct = products.find((obj) => obj.id === value.id);

    if (!findProduct) return 0;

    return sum + findProduct.price * value.count;
  }, 0);

  return (
    <div>
      <h1>check out</h1>
      <p>TOTAL: {total}</p>

      <InputForm cookie={perseStoreCookie} />
      {/* contain total price , input for shipping ,payment information */}
    </div>
  );
}
