'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

export default function CheckOutButton() {
  const router = useRouter();
  return (
    <div>
      <Button
        dataTestId="cart-checkout"
        buttonName="Checkout"
        type="button"
        onClick={() => router.push('/check-out')}
      />
    </div>
  );
}
