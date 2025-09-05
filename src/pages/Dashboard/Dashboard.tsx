import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGOUT_EP = "/auth/logout";

const Dashboard = () => {
  const { user, loading, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      Dashboard
      <button onClick={() => (window.location.href = API_BASE_URL + LOGOUT_EP)}>
        Logout
      </button>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
