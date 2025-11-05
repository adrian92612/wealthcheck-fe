import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./pages/Dashboard/Overview";
import NotFound from "./pages/NotFound";
import Wallet from "./pages/Dashboard/Wallet";
import Category from "./pages/Dashboard/Category";
import Transaction from "./pages/Dashboard/Transaction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="category" element={<Category />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
