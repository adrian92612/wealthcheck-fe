import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const Dashboard = () => {
  const { user, loading, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-dvh flex w-full">
      <Sidebar />

      <main className="flex-1 h-dvh overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
