export type Products = { id: number; productName: string; price: number };
export const products: Products[] = [
  {
    id: 1,
    productName: 'Cat-Walk',
    price: 500,
  },
  {
    id: 2,
    productName: 'Food',
    price: 15,
  },
  {
    id: 3,
    productName: 'Toy',
    price: 3,
  },
  {
    id: 4,
    productName: 'Toilet',
    price: 25,
  },
  {
    id: 5,
    productName: 'Sofa',
    price: 100,
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id: number) {
  return products.find((product) => product.id === id);
}
