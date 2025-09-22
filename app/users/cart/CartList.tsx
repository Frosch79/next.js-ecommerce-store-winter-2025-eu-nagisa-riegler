'use client';

import Link from 'next/link';
import { use, useMemo, useState } from 'react';
import type { Product } from '../../../migrations/00002-createTableProducts';
import { removeProductCookies } from '../../check-out/action';
import type { ProductCount } from '../../products/[productId]/action';
import Button from './Button';
import styles from './CartList.module.scss';

type Props = {
  callItems: Promise<Product[]>;
  productCookies: Promise<ProductCount[]>;
};
export default function CartList(props: Props) {
  const products: Product[] = use(props.callItems);
  const cookieItem: ProductCount[] = use(props.productCookies);

  const [cartItems, setCartItems] = useState<ProductCount[]>(cookieItem);

  const total = useMemo(() => {
    if (cartItems.length === 0) return 0;
    const calculateTotal = cartItems.reduce(
      (sum: number, item: ProductCount): number => {
        const findItem = products.find(
          (product: Product) => product.id === item.id,
        );
        if (!findItem) return 0;

        return sum + findItem.price * item.count;
      },
      0,
    );
    return calculateTotal;
  }, [cartItems, products]);

  const removeHandle = async (id: number) => {
    const newItemsArray = cartItems.filter((item) => {
      return id !== item.id;
    });

    await removeProductCookies(newItemsArray);

    setCartItems(newItemsArray);
  };

  return (
    <div>
      {cartItems.map((obj) => {
        const findItem = products.find((product) => obj.id === product.id);
        if (!findItem) return <p key="message">Your Cart is empty</p>;
        return (
          <div
            className={styles.cartItems}
            key={`adding-${obj.id}`}
            data-test-id={`cart-product-${obj.id}`}
          >
            <ul>
              <li>
                <Link href={`/products/${obj.id}`}>
                  {findItem.productName.replace('-', ' ')}
                </Link>
              </li>
              <li
                data-test-id={`cart-product-quantity-${obj.id}`}
              >{`quantity:${obj.count}`}</li>
              <li>{`price:${findItem.price * obj.count}`}</li>
            </ul>
            <Button
              dataTestId={`cart-product-remove-${obj.id}`}
              type="button"
              onClick={() => removeHandle(obj.id)}
              buttonName="Remove"
            />
          </div>
        );
      })}

      <p data-test-id="cart-total">{`TOTAL: $${total}`}</p>
    </div>
  );
}
