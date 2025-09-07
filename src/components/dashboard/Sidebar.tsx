import { appRoute } from "@/constants/appRoutes";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { apiEndpoints } from "@/constants/apiEndpoints";
import { useState } from "react";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

type Menu = {
  label: string;
  link: string;
};

const menu: Menu[] = [
  {
    label: "Overview",
    link: appRoute.overview,
  },
  {
    label: "Transactions",
    link: appRoute.transactions,
  },
  {
    label: "Income",
    link: appRoute.income,
  },
  {
    label: "Expense",
    link: appRoute.expense,
  },
  {
    label: "Transfer",
    link: appRoute.transfer,
  },
  {
    label: "Wallet",
    link: appRoute.wallet,
  },
  {
    label: "Goals",
    link: appRoute.goals,
  },
];

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const toggleSidebar = () => setOpen(!open);

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        open ? "w-48" : "w-10",
        "flex flex-col justify-between py-5 overflow-hidden transition-all duration-300 border-r-2"
      )}
    >
      <div>
        <Button
          onClick={toggleSidebar}
          aria-expanded={open}
          aria-controls="sidebar-nav"
        >
          toggle
        </Button>
        <nav
          id="sidebar-nav"
          aria-label="Main navigation"
          className="flex flex-col gap-3"
        >
          {menu.map((m, i) => (
            <Button key={i} asChild variant="link" className="w-full">
              <Link to={m.link}>{m.label}</Link>
            </Button>
          ))}
        </nav>
      </div>

      <div>
        <Button asChild variant="destructive" size="sm" className="w-full">
          <Link to={apiEndpoints.auth.logout}>Logout</Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
