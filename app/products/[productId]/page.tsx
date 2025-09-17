import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Products } from '../../../database/products';
import { getProductInsecure } from '../../../database/users';
import Counter from './Counter';
import styles from './page.module.scss';

type Props = {
  params: Promise<{
    productId: Products['id'];
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

export default async function Product(props: Props) {
  const catProduct = await getProductInsecure(
    Number((await props.params).productId),
  );

  if (!catProduct) notFound();
  return (
    <div className={styles.page}>
      <ul key={`product-${catProduct.id}`}>
        <li>
          <h1>{catProduct.productName.replace('-', ' ')}</h1>
        </li>
        <li>
          <Image
            className={styles.image}
            data-test-id="product-image"
            src={`/images/${catProduct.productName.toLowerCase()}.jpg`}
            alt={`image-${catProduct.productName}`}
            width={400}
            height={300}
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
