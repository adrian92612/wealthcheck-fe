import { appRoute } from "@/constants/appRoutes";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import {
  LucideHome,
  LucideCreditCard,
  LucideWallet,
  LucideTag,
  LucideTarget,
} from "lucide-react";
import type { Menu } from "@/lib/types";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";

const menu: Menu[] = [
  { label: "Overview", link: appRoute.overview, icon: LucideHome },
  {
    label: "Transactions",
    link: appRoute.transactions,
    icon: LucideCreditCard,
  },
  { label: "Wallet", link: appRoute.wallet, icon: LucideWallet },
  { label: "Category", link: appRoute.category, icon: LucideTag },
  { label: "Goals", link: appRoute.goals, icon: LucideTarget },
];

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(!isMobile);
  const toggleSidebar = () => setOpen(!open);

  const handleLinkClick = () => {
    if (!open && !isMobile) setOpen(true);
    if (open && isMobile) setOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <MobileNavBar
          open={open}
          setOpen={setOpen}
          handleLinkClick={handleLinkClick}
          menu={menu}
        />
      ) : (
        <NavBar
          open={open}
          toggleSidebar={toggleSidebar}
          handleLinkClick={handleLinkClick}
          menu={menu}
        />
      )}
    </>
  );
};

export default Sidebar;
