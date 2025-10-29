'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Product } from '../../migrations/00002-createTableProducts';
import { testCart } from '../../util/cartCache';
import { calculateTotal } from '../../util/totalCartSum';
import type { ProductCount } from '../products/[productId]/action';
import { changeProductCookies } from './action';
import Button from './Button';
import styles from './CartList.module.scss';

type Props = {
  callItems: Product[];
  productCookies: ProductCount[];
};
export default function CartList(props: Props) {
  const products: Product[] = props.callItems;
  const cookieItem: ProductCount[] = props.productCookies;

  const total = useMemo(() => {
    return calculateTotal(products, cookieItem);
  }, [cookieItem, products]);

  const removeHandle = async (id: number) => {
    await changeProductCookies(cookieItem, id);
  };

  const testedItems = testCart(cookieItem, products);

  return (
    <div>
      {testedItems.map((obj) => {
        return (
          <div
            className={styles.cartItems}
            key={`adding-${obj.id}`}
            data-test-id={`cart-product-${obj.id}`}
          >
            <ul>
              <li>
                <Link href={`/products/${obj.id}`}>
                  {obj.productName.replace('-', ' ')}
                </Link>
              </li>
              <li className={styles.priceText}>
                <p
                  data-test-id={`cart-product-quantity-${obj.id}`}
                >{`${obj.count}`}</p>
                <p>{`price:${obj.price * obj.count}`}</p>
              </li>
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
      <div className={styles.priceText}>
        <p>TOTAL: </p>
        <p data-test-id="cart-total">{`${total}`}</p>
      </div>
    </div>
  );
}
