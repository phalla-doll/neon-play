import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link href="/" className="mt-4 text-lime-400 hover:text-lime-500 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
