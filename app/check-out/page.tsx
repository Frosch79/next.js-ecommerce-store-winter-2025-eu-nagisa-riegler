import { checkOutProducts } from './action';
import InputForm from './InputForm';

export const metadata = {
  title: 'Check out',
  descriptions: 'confirm oder',
};

export default function CheckOutPage() {
  return (
    <div>
      <h1>check out</h1>
      <p>TOTAL: {checkOutProducts()}</p>

      <InputForm />
      {/* contain total price , input for shipping ,payment information */}
    </div>
  );
}
