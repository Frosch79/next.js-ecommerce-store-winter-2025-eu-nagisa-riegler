import Image from 'next/image';
import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import styles from './page.module.scss';

export const metadata = {
  title: 'Products',
  descriptions: 'search your product.',
};

export default async function Products() {
  const products = await getProductsInsecure();

  return (
    <div>
      <h1>Our products</h1>
      {products.map((product) => {
        return (
          <ul key={`product-${product.id}`} className={styles.productLink}>
            <li>
              <Link
                data-test-id={`product-${product.id}`}
                prefetch={true}
                href={`/products/${product.id}`}
                className={styles.productLinkImage}
              >
                {product.productName.replace('-', ' ')}
                <Image
                  data-test-id="product-image"
                  src={`/images/${product.productName.toLowerCase()}.jpg`}
                  alt={`image-${product.productName}`}
                  width={200}
                  height={120}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </li>
            <li>{`${product.price}`}</li>
          </ul>
        );
      })}
      {/* ul list with list mapping sort by id */}
    </div>
  );
}
