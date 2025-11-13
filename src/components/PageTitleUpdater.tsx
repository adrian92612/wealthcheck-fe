import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const appName = "WealthCheck";

const routeTitles: Record<string, string> = {
  "/": `Home | ${appName}`,
  "/dashboard": `Dashboard | ${appName}`,
  "/dashboard/overview": `Overview | ${appName}`,
  "/dashboard/transaction": `Transactions | ${appName}`,
  "/dashboard/wallet": `Wallets | ${appName}`,
  "/dashboard/category": `Categories | ${appName}`,
};

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || appName;
    document.title = title;
  }, [location.pathname]);

  return null;
};

export default PageTitleUpdater;
