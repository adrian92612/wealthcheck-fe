import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import useIsMobile from "@/hooks/useIsMobile";

const Dashboard = () => {
  const { user, loading, refreshUser } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    refreshUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-dvh flex w-full">
      {!isMobile && <Sidebar />}

      <main className="flex-1 h-dvh overflow-y-auto px-2 md:px-10">
        {isMobile && <Sidebar />}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
