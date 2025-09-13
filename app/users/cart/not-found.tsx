import Link from 'next/link';

export default function CartNotFound() {
  return (
    <div>
      <div>
        Mrrrow! Empty basket... I guess I’ll just chase my tail instead.
      </div>
      <Link href="/">Return home</Link>
    </div>
  );
}
