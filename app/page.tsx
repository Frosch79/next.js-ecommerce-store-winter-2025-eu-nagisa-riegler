import styles from './page.module.scss';

export const metadata = {
  title: 'home',
  descriptions: 'home page',
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <h2>Welcome ! The cat already sat on your keyboard.</h2>
    </div>
  );
}
