'use client';
import { useState } from 'react';
import { createCookie } from './action';
import Button from './Button';
import styles from './Counter.module.scss';

type Props = {
  productValue: number;
};

export default function Counter(props: Props) {
  const id = props.productValue;
  const [count, setCount] = useState(1);

  const cookieHandle = () => {
    createCookie({ id, count }, 'cart').catch((error) => console.log(error));
    setCount(1);
  };

  return (
    <div>
      <form className={styles.counter}>
        {/* count button*/}
        <input
          className={styles.button}
          type="button"
          onClick={() => (count > 1 ? setCount(count - 1) : setCount(1))}
          value="-"
        />

        <input
          className={styles.countText}
          data-test-id="product-quantity"
          value={count}
          readOnly={true}
        />

        <input
          className={styles.button}
          type="button"
          onClick={() => setCount(count + 1)}
          value="+"
        />

        {/* add to cart button */}
        <Button
          type="submit"
          formAction={() => cookieHandle()}
          buttonName="Add to cart"
          dataTestId="product-add-to-cart"
        />
        {/* sent to cookie the count and price */}
      </form>
    </div>
  );
}
