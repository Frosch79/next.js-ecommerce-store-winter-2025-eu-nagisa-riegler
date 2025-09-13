import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'Thank you for your order',
  descriptions: 'success!',
};
export default function Greeting() {
  return (
    <div className={styles.greeting}>
      <h1>Mrrrow! You did it! Now the cat can nap in peace.</h1>

      <Link href="/">to Top</Link>
    </div>
  );
}
