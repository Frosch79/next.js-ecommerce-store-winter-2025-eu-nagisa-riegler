'use client';
import Link from 'next/link';
import Button from './Button';

export default function CheckOutButton() {
  return (
    <div>
      <Link href="/check-out">
        <Button
          dataTestId="cart-checkout"
          buttonName="Checkout"
          type="button"
        />
      </Link>
    </div>
  );
}
