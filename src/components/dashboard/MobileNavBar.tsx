import { LucideAlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import AvatarSection from "./AvatarSection";
import { NavLink } from "react-router";
import type { Menu } from "@/lib/types";

import logo from "@/assets/wealthcheck-logo.webp";
import logoText from "@/assets/wealthcheck-text-logo.webp";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleLinkClick: () => void;
  menu: Menu[];
};

const MobileNavBar = ({ open, setOpen, handleLinkClick, menu }: Props) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="sticky top-0 ml-2 mb-2 rounded-full backdrop-blur-2xl bg-primary text-white z-10"
        >
          <LucideAlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pt-10 justify-between">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Sheet</SheetTitle>
          <SheetDescription>Navigation sheet</SheetDescription>
        </SheetHeader>
        <div className="space-y-5">
          <div className="ml-1.5 flex items-center gap-2">
            <img src={logo} alt="WealthCheck logo" className="size-8" />
            <img
              src={logoText}
              alt="WealthCheck logo text"
              className="max-w-40"
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
                      <span>
                        <Icon className="size-5" />
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
