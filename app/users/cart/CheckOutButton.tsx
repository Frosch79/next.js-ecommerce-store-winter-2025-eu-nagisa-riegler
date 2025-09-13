'use client';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function CheckOutButton() {
  const router = useRouter();

  const checkOutHandle = () => {
    router.push('/check-out');
  };
  return (
    <div>
      <Button
        dataTestId="cart-checkout"
        buttonName="Checkout"
        type="button"
        onClick={() => checkOutHandle()}
      />
    </div>
  );
}
