import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductInsecure } from '../../../database/products';
import type { Product } from '../../../migrations/00002-createTableProducts';
import Counter from './Counter';
import styles from './page.module.scss';

type Props = {
  params: Promise<{
    productId: Product['id'];
  }>;
};
export async function generateMetadata(props: Props) {
  const catProduct = await getProductInsecure(
    Number((await props.params).productId),
  );

  if (!catProduct) notFound();
  return {
    title: catProduct.productName,
    descriptions: 'product page',
  };
}

export default async function ProductPage(props: Props) {
  const catProduct = await getProductInsecure(
    Number((await props.params).productId),
  );

  if (!catProduct) notFound();
  return (
    <div className={styles.page}>
      <h1>{catProduct.productName.replace('-', ' ')}</h1>
      <ul key={`product-${catProduct.id}`}>
        <li>
          <Image
            className={styles.image}
            data-test-id="product-image"
            src={`/images/${catProduct.productName.toLowerCase()}.jpg`}
            alt={`image-${catProduct.productName}`}
            width={400}
            height={300}
            style={{ width: '100%', height: 'auto' }}
          />
        </li>
        <li
          className={styles.price}
          data-test-id="product-price"
        >{`${catProduct.price}`}</li>
      </ul>
      <Counter productValue={catProduct.id} />

      {/* ul list of a product. shows price product name image  */}
    </div>
  );
}
