import { appRoute } from "@/constants/appRoutes";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
      <p className="mt-2 text-lg text-muted-foreground">{error.message}</p>

      <div className="mt-4 flex gap-3">
        <Button
          onClick={resetErrorBoundary}
          className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
        >
          Try Again
        </Button>

        <Button
          onClick={() => navigate(appRoute.home)}
          className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
