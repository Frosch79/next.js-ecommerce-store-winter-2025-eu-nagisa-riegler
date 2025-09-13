import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div>
      <div>
        Nyaa~ No such item found... probably knocked off the shelf by a cat.
      </div>
      <Link href="/">Return home</Link>
    </div>
  );
}
