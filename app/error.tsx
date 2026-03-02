'use client';

interface ErrorBoundaryProps {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const { error, reset } = props;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <button 
        type="button"
        onClick={reset} 
        className="mt-4 px-4 py-2 bg-lime-400 text-black rounded hover:bg-lime-500 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
