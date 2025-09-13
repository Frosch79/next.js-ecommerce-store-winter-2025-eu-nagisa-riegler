import Link from 'next/link';
import { getUsersCartInsecure } from '../../database/users';

export const metadata = {
  title: 'Users',
  descriptions: 'User page',
};

export default async function UserCartPage() {
  // receive user id from storage?

  const user = await getUsersCartInsecure(1);

  return (
    <div>
      <h1>Our users</h1>
      {user.userCart.map((cart) => {
        return (
          <ul key={`cartNo.-${cart.id}`}>
            <li>
              <Link href={`/users/user-cart/${cart.id}`}>{cart.date}</Link>
            </li>
          </ul>
        );
      })}
      {/* ul list with list mapping sort by id */}
    </div>
  );
}
