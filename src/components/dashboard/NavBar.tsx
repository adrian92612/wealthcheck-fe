import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LucideChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import AvatarSection from "./AvatarSection";
import logo from "@/assets/wealthcheck-logo.webp";
import logoText from "@/assets/wealthcheck-text-logo.webp";
import type { Menu } from "@/lib/types";

type Props = {
  open: boolean;
  toggleSidebar: () => void;
  handleLinkClick: () => void;
  menu: Menu[];
};

const NavBar = ({ open, toggleSidebar, handleLinkClick, menu }: Props) => {
  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        open ? "w-56" : "w-16",
        "flex flex-col justify-between bg-card pt-2  transition-all ease-in-out duration-200 border-r border-r-primary/10 relative"
      )}
    >
      {/* <div
        className={cn(
          "flex items-center w-fit justify-start px-3.5 mb-2 whitespace-nowrap absolute -right-1/2 top-10 z-10  "
        )}
      > */}
      <Button
        onClick={toggleSidebar}
        variant="default"
        size="icon"
        aria-expanded={open}
        aria-controls="sidebar-nav"
        className="absolute -right-3.5 top-6 rounded-full size-6"
      >
        <LucideChevronRight className={cn("size-4", open && "rotate-180")} />
      </Button>
      <div className="overflow-hidden">
        <div className="pl-4 pt-2 flex items-center gap-4 mb-5">
          <img src={logo} alt="WealthCheck logo" className="size-8" />
          <img
            src={logoText}
            alt="WealthCheck logo text"
            className="max-w-36"
          />
        </div>

        <nav
          id="sidebar-nav"
          aria-label="Main navigation"
          className="flex flex-col gap-3"
        >
          {menu.map((m, i) => {
            const Icon = m.icon;
            return (
              <NavLink key={i} to={m.link}>
                {({ isActive }) => (
                  <Button
                    asChild
                    variant="link"
                    onClick={handleLinkClick}
                    className={cn(
                      "w-full justify-start gap-5.5 rounded-none hover:text-secondary transition-none",
                      isActive && "bg-primary/5 border-l-5 border-primary"
                    )}
                  >
                    <span className="pl-4.5">
                      <Icon className="size-6" />
                      {m.label}
                    </span>
                  </Button>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <AvatarSection />
    </aside>
  );
};

export default NavBar;
