import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import type { Menu } from "@/lib/types";
import { appRoute } from "@/constants/appRoutes";
import {
  LucideCreditCard,
  LucideHome,
  LucideTag,
  LucideWallet,
} from "lucide-react";

const menu: Menu[] = [
  { label: "Overview", link: appRoute.overview, icon: LucideHome },
  {
    label: "Transactions",
    link: appRoute.transactions,
    icon: LucideCreditCard,
  },
  { label: "Wallet", link: appRoute.wallet, icon: LucideWallet },
  { label: "Category", link: appRoute.category, icon: LucideTag },
  // { label: "Goals", link: appRoute.goals, icon: LucideTarget },
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
