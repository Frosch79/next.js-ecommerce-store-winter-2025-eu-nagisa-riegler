import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div>
      <div>This page was not found</div>
      <Link href="/">Return home</Link>
    </div>
  );
}
