'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Products } from '../../../database/products';
import { removeProductCookies } from '../../check-out/action';
import type { ProductCount } from '../../products/[productId]/action';
import { getCartProducts, getProductCookies } from './action';
import Button from './Button';
import styles from './CartList.module.scss';

export default function CartList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [cartItems, setCartItems] = useState<ProductCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const callProductToCart = async () => {
      const userCartItems = await getProductCookies();
      const cartProducts = await getCartProducts();
      const itemList = [];
      for (const item of userCartItems) {
        const product = cartProducts.find((data) => data.id === item.id);
        if (product) itemList.push(product);
      }
      setProducts(itemList);
      setCartItems(userCartItems);
    };
    callProductToCart().catch((error) => console.log(error));

    setIsLoading(false);
  }, []);

  // calculate items total price
  const total = useMemo(() => {
    if (cartItems.length === 0) return 0;
    const calculateTotal = cartItems.reduce(
      (sum: number, item: ProductCount): number => {
        const findItem = products.find(
          (product: Products) => product.id === item.id,
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
      {isLoading ? (
        <p>Loading now</p>
      ) : (
        <>
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
                      {findItem.productName}
                    </Link>
                  </li>
                  <li
                    data-test-id={`cart-product-quantity-${obj.id}`}
                  >{`${findItem.price} x ${obj.count}`}</li>
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
        </>
      )}
      <p data-test-id="cart-total">{`TOTAL: $${total}`}</p>
    </div>
  );
}
