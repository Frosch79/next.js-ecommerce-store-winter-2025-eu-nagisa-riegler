'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import type { CartItem } from '../../migrations/00006-createTableCartItems';
import { getLocalStorage, setLocalStorage } from '../../util/localStorage';
import type { ItemResponseBodyPost } from '../api/users/[userId]/user-cart/[cartId]/items/route';
import type { CartResponseBodyPost } from '../api/users/[userId]/user-cart/route';
import ErrorMessage from '../ErrorMessage';
import type { ProductCount } from '../products/[productId]/action';
import { checkCookies, deleteProductCookies } from './action';
import Button from './Button';
import styles from './InputForm.module.scss';
import InputFormParts from './InputFormParts';

export default function InputForm() {
  const router = useRouter();

  function getFromLocalStorage(key: string | number) {
    const storage = getLocalStorage(key);
    if (!storage) return undefined;
    if (typeof key === 'number') return Number(storage);
    return storage;
  }

  const [cart, setCart] = useState<ProductCount[]>([]);
  const [firstName, setFirstName] = useState(
    getFromLocalStorage('firstName') || '',
  );
  const [lastName, setLastName] = useState(
    getFromLocalStorage('lastName') || '',
  );
  const [email, setEmail] = useState(getFromLocalStorage('email') || '');
  const [userAddress, setUserAddress] = useState(
    getFromLocalStorage('userAddress') || '',
  );
  const [userCity, setUserCity] = useState(
    getFromLocalStorage('userCity') || '',
  );
  const [userPostalCode, setUserPostalCode] = useState(
    getFromLocalStorage('userPostalCode') || 0,
  );
  const [userCountry, setUserCountry] = useState(
    getFromLocalStorage('userCountry') || '',
  );
  const [creditCard, setCreditCard] = useState(0);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [securityCode, setSecurityCode] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const today = new Date()
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '-');

  useEffect(() => {
    const callCookies = async () => {
      const response = await checkCookies();

      setCart(response);
    };
    callCookies().catch((error) => console.log(error));
  }, []);

  const clickHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length <= 0) {
      setErrorMessage('Cart is empty !');
      return;
    } else if (firstName === '') {
      setErrorMessage('First name is empty ');
      return;
    } else if (lastName === '') {
      setErrorMessage('Last name is empty !');
      return;
    } else if (email === '') {
      setErrorMessage('email is empty !');
      return;
    } else if (userAddress === '') {
      setErrorMessage('Address is empty !');
      return;
    } else if (userCity === '') {
      setErrorMessage('City is empty !');
      return;
    } else if (userPostalCode === 0) {
      setErrorMessage('Postal code is empty !');
      return;
    } else if (userCountry === '') {
      setErrorMessage('Country is empty !');
      return;
    } else if (creditCard === 0) {
      setErrorMessage('Credit card number  is empty !');
      return;
    } else if (expirationDate < new Date()) {
      setErrorMessage('Expiration date must be future date !');
      return;
    } else if (securityCode === 0) {
      setErrorMessage('Security code is empty !');
      return;
    }

    const response = await fetch(`/api/users/1/user-cart`, {
      method: 'POST',
      body: JSON.stringify({ userId: 1, date: today }),
    });

    setErrorMessage('');

    if (!response.ok) {
      let newErrorMessage = 'Error';

      const body: CartResponseBodyPost = await response.json();

      if ('error' in body) {
        newErrorMessage = body.error;
      }
      setErrorMessage(newErrorMessage);
      return;
    }

    const cartId: { cart: { id: number; userId: number; date: Date } } =
      await response.json();

    const id = cartId.cart.id;

    for (const item of cart) {
      const itemData: Omit<CartItem, 'id'> = {
        cartId: id,
        productsId: item.id,
        quantity: item.count,
      };
      const itemResponse = await fetch(`/api/users/1/user-cart/${id}/items`, {
        method: 'POST',
        body: JSON.stringify(itemData),
      });

      setErrorMessage('');

      if (!itemResponse.ok) {
        let newErrorMessage = 'Error deleting ';

        const responseBody: ItemResponseBodyPost = await itemResponse.json();

        if ('error' in responseBody) {
          newErrorMessage = responseBody.error;
        }
        setErrorMessage(newErrorMessage);
        return;
      }
    }
    localStorage.clear();
    const deleteCookies = async () => await deleteProductCookies();
    deleteCookies().catch((error) => console.log(error));

    router.push('/greeting');
    router.refresh();
  };

  return (
    <div>
      <form className={styles.form} onSubmit={(event) => clickHandle(event)}>
        <div id="name">
          <InputFormParts
            labelValue="First name"
            label="first-name"
            dataTestId="checkout-first-name"
            onChange={(event) => {
              setFirstName(event.currentTarget.value.toLowerCase());
              setLocalStorage(
                'firstName',
                event.currentTarget.value.toLowerCase(),
              );
            }}
            type=""
            value={firstName as string}
          />

          <InputFormParts
            labelValue="Last name"
            label="last-name"
            dataTestId="checkout-last-name"
            onChange={(event) => {
              setLastName(event.currentTarget.value.toLowerCase());
              setLocalStorage(
                'lastName',
                event.currentTarget.value.toLowerCase(),
              );
            }}
            type=""
            value={lastName as string}
          />
        </div>

        <div id="address-data">
          <InputFormParts
            labelValue="E-mail"
            label="email"
            dataTestId="checkout-email"
            type="email"
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              setLocalStorage('email', event.currentTarget.value);
            }}
            value={email as string}
          />
          <InputFormParts
            labelValue="Address"
            label="address"
            dataTestId="checkout-address"
            onChange={(event) => {
              setUserAddress(event.currentTarget.value);
              setLocalStorage('userAddress', event.currentTarget.value);
            }}
            type=""
            value={userAddress as string}
          />

          <InputFormParts
            labelValue="City"
            label="city"
            dataTestId="checkout-city"
            onChange={(event) => {
              setUserCity(event.currentTarget.value);
              setLocalStorage('userCity', event.currentTarget.value);
            }}
            type=""
            value={userCity as string}
          />
          <InputFormParts
            labelValue="Postal Code"
            label="postal-code"
            dataTestId="checkout-postal-code"
            type="number"
            onChange={(event) => {
              setUserPostalCode(Number(event.currentTarget.value));
              setLocalStorage('userPostalCode', event.currentTarget.value);
            }}
            value={
              (userPostalCode as number) === 0 ? '' : (userPostalCode as number)
            }
          />
          <InputFormParts
            labelValue="Country"
            label="country"
            dataTestId="checkout-country"
            onChange={(event) => {
              setUserCountry(event.currentTarget.value);
              setLocalStorage('userCountry', event.currentTarget.value);
            }}
            type=""
            value={userCountry as string}
          />
        </div>

        <div id="card-data">
          <InputFormParts
            labelValue="Credit card"
            label="credit-card"
            dataTestId="checkout-credit-card"
            type="number"
            onChange={(event) => {
              setCreditCard(Number(event.currentTarget.value));
            }}
            value={creditCard === 0 ? '' : creditCard}
          />
          <InputFormParts
            labelValue="Expiration date"
            label="expiration-date"
            dataTestId="checkout-expiration-date"
            type="date"
            onChange={(event) => {
              setExpirationDate(new Date(event.currentTarget.value));
            }}
            value={dayjs(expirationDate).format('YYYY-MM-DD')}
          />
          <InputFormParts
            labelValue="Security code"
            label="security-code"
            dataTestId="checkout-security-code"
            type="number"
            onChange={(event) => {
              setSecurityCode(Number(event.currentTarget.value));
              setLocalStorage();
            }}
            value={securityCode === 0 ? '' : securityCode}
          />
        </div>

        <Button
          buttonName="Confirm Order"
          type="submit"
          data-test-id="checkout-confirm-order"
        />
      </form>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
