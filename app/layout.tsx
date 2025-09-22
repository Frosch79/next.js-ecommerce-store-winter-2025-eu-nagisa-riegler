import './globals.scss';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './page.module.scss';
import { getProductCookies } from './users/cart/action';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: 'AMEOWZON',
    template: '%s | AMEOWZON',
  },
  description: 'Meow Meow',
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout(props: Props) {
  const cookie = await getProductCookies();

  const totalCart =
    cookie.length <= 0
      ? 0
      : cookie.reduce((sum, value) => sum + value.count, 0);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <Link href="/" className={styles.headerLink}>
            <div>AMEOWZON.ng</div>
          </Link>
          <nav className={styles.navigation}>
            <Link
              href="/"
              className={`${styles.textBorder} ${styles.productLink}`}
            >
              home
            </Link>
            <Link
              href="/about"
              className={`${styles.textBorder} ${styles.productLink}`}
            >
              about us
            </Link>

            <Link
              data-test-id="products-link"
              href="/products"
              className={`${styles.textBorder} ${styles.productLink}`}
            >
              products
            </Link>
            <Link
              data-test-id="cart-link"
              href="/users/cart"
              prefetch={true}
              className={`${styles.textBorder} ${styles.cartLink}`}
            >
              cart <p data-test-id="cart-count">{totalCart}</p>
            </Link>
          </nav>
        </header>
        <main>{props.children}</main>
        <footer>
          <p>created by Frosch_79</p>
        </footer>
      </body>
    </html>
  );
}
