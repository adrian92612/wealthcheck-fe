import { Navigate, Outlet } from "react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import useIsMobile from "@/hooks/useIsMobile";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { appRoute } from "@/constants/appRoutes";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();

  if (loading) return <DashboardSkeleton />;
  if (!user) return <Navigate to={appRoute.home} replace />;

  return (
    <div className="min-h-dvh flex w-full">
      {!isMobile && <Sidebar />}

      <main className="flex-1 h-dvh overflow-y-auto px-2 md:px-10 py-5">
        {isMobile && <Sidebar />}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
