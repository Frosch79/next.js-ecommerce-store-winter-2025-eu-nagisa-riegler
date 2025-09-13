import { getProductsInsecure } from '../../database/users';
import { checkCookies } from './action';
import InputForm from './InputForm';

export const metadata = {
  title: 'Check out',
  descriptions: 'confirm oder',
};

export default async function CheckOutPage() {
  const cookieData = await checkCookies();

  const products = await getProductsInsecure();
  const total = cookieData.reduce((sum, value) => {
    const findProduct = products.find((obj) => obj.id === value.id);

    if (!findProduct) return 0;

    return sum + findProduct.price * value.count;
  }, 0);

  return (
    <div>
      <h1>check out</h1>
      <p>TOTAL: {total}</p>

      <InputForm />
      {/* contain total price , input for shipping ,payment information */}
    </div>
  );
}
