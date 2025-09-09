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
        "flex flex-col justify-between py-2 overflow-hidden transition-all ease-linear duration-300 border-r border-r-forestGreen"
      )}
    >
      <div>
        <div
          className={cn(
            "flex items-center w-full justify-start px-3.5 mb-2 whitespace-nowrap"
          )}
        >
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="icon"
            aria-expanded={open}
            aria-controls="sidebar-nav"
            className="ml-auto border-2 border-forestGreen text-forestGreen hover:text-secondary hover:border-secondary"
          >
            <LucideChevronRight
              className={cn(
                "size-6 transition-all duration-300",
                open && "rotate-180"
              )}
            />
          </Button>
        </div>

        <div className="pl-4 flex items-center gap-4 mb-5">
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
                      "w-full justify-start gap-5.5 rounded-none hover:text-secondary",
                      isActive && "bg-forestGreen text-background"
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
