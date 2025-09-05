import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./pages/Dashboard/Overview";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Settings from "./pages/Dashboard/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="income" element={<Income />} />
        <Route path="expense" element={<Expense />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
