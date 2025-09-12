type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
      <p className="mt-2 text-lg text-muted-foreground">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
