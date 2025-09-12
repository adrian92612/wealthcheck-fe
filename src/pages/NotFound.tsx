import { Button } from "@/components/ui/button";
import { appRoute } from "@/constants/appRoutes";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-6xl font-extrabold text-red-600">404</h1>
      <p className="text-xl font-semibold">Page Not Found</p>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does&apos;t exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Button asChild>
        <Link to={appRoute.overview} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
