import { Button } from "@/components/ui/button";
import { apiEndpoints } from "@/constants/apiEndpoints";
import logo from "@/assets/wealthcheck-logo.webp";
import logoText from "@/assets/wealthcheck-text-logo.webp";
import useIsMobile from "@/hooks/useIsMobile";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { appRoute } from "@/constants/appRoutes";

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
};

const Home = () => {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Navigate to={appRoute.overview} replace />;

  return (
    <div className="min-h-dvh flex flex-col bg-linear-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/80 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-secondary/70 rounded-full blur-3xl" />
      <div className="absolute top-40 right-56 w-96 h-96 bg-primary/70 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-56 w-96 h-96 bg-secondary/70 rounded-full blur-3xl" />

      <header className="relative w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white/70 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <img src={logoText} alt="Wealthcheck" className="h-6 sm:h-8" />
        </div>
        <Button
          asChild
          className="bg-primary text-white font-medium hover:bg-primary/90"
        >
          <a href={apiEndpoints.auth.googleLogin}>
            <GoogleIcon /> {!isMobile && "Login with Google"}
          </a>
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center relative z-10">
        <div className="max-w-xl flex flex-col gap-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Smarter Money Management
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Track wallets, analyze spending, and grow financial clarity with a
            clean modern dashboard.
          </p>

          <Button
            asChild
            size="lg"
            className="w-fit mx-auto bg-primary text-white font-semibold shadow-md hover:scale-105 transition-transform"
          >
            <a href={apiEndpoints.auth.googleLogin}>Get Started</a>
          </Button>
        </div>
      </main>

      <footer className="relative z-10 px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-200 bg-white/70 backdrop-blur">
        © {new Date().getFullYear()} Wealthcheck. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
